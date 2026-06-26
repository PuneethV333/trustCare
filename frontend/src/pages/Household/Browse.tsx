import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Star,
  ShieldCheck,
  MapPin,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { Checkbox } from "../../components/ui/Checkbox";
import { Label } from "../../components/ui/Label";
import { Slider } from "../../components/ui/Slider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/Sheet";
import { useGetMaids } from "../../hooks/useMaid.";

type ServiceType = "Maid" | "Nanny" | "Babysitter";
type ExperienceRange =
  | "Any"
  | "1-3 years"
  | "3-5 years"
  | "5+ years"
  | "10+ years";

interface Filters {
  search: string;
  serviceTypes: ServiceType[];
  experienceRanges: ExperienceRange[];
  maxPrice: number;
}

const SERVICE_TYPES: ServiceType[] = ["Maid", "Nanny", "Babysitter"];
const EXPERIENCE_RANGES: ExperienceRange[] = [
  "Any",
  "1-3 years",
  "3-5 years",
  "5+ years",
  "10+ years",
];
const MAX_PRICE = 1000;
const DEFAULT_FILTERS: Filters = {
  search: "",
  serviceTypes: [],
  experienceRanges: [],
  maxPrice: MAX_PRICE,
};

function parseExperienceYears(exp: string): number {
  const match = exp.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function matchesExperienceRange(
  exp: string,
  ranges: ExperienceRange[],
): boolean {
  if (ranges.length === 0 || ranges.includes("Any")) return true;
  const years = parseExperienceYears(exp);
  return ranges.some((range) => {
    if (range === "1-3 years") return years >= 1 && years <= 3;
    if (range === "3-5 years") return years >= 3 && years <= 5;
    if (range === "5+ years") return years >= 5;
    if (range === "10+ years") return years >= 10;
    return true;
  });
}

function parseMonthlyCost(cost: string): number {
  const digits = cost.replace(/[^\d]/g, "");
  const value = parseInt(digits, 10) || 0;
  if (cost.includes("/hr")) return value * 8 * 22;
  return value;
}

function countActiveFilters(filters: Filters): number {
  let count = 0;
  if (filters.serviceTypes.length > 0) count++;
  if (filters.experienceRanges.length > 0) count++;
  if (filters.maxPrice < MAX_PRICE) count++;
  return count;
}

export default function BrowsePage() {
  const { data: HELPERS } = useGetMaids();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    if (!HELPERS) return [];
    return HELPERS.filter((helper) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const nameMatch = helper.user.name.toLowerCase().includes(q);
        const typeMatch = helper.type.toLowerCase().includes(q);
        if (!nameMatch && !typeMatch) return false;
      }

      if (filters.serviceTypes.length > 0) {
        const helperTypes = helper.type
          .split(/[&,]/)
          .map((t: string) => t.trim());
        const hasMatch = filters.serviceTypes.some((st) =>
          helperTypes.some((ht: string) =>
            ht.toLowerCase().includes(st.toLowerCase()),
          ),
        );
        if (!hasMatch) return false;
      }

      if (
        filters.experienceRanges.length > 0 &&
        !filters.experienceRanges.includes("Any")
      ) {
        if (
          !matchesExperienceRange(
            String(helper.experience ?? "0"),
            filters.experienceRanges,
          )
        )
          return false;
      }

      const monthly = parseMonthlyCost(helper.costPerHour);
      if (monthly > filters.maxPrice) return false;

      return true;
    });
  }, [HELPERS, filters]);

  function toggleServiceType(type: ServiceType) {
    setFilters((prev) => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(type)
        ? prev.serviceTypes.filter((t) => t !== type)
        : [...prev.serviceTypes, type],
    }));
  }

  function toggleExperienceRange(range: ExperienceRange) {
    setFilters((prev) => {
      if (range === "Any") {
        return { ...prev, experienceRanges: ["Any"] };
      }
      const without = prev.experienceRanges.filter((r) => r !== "Any");
      return {
        ...prev,
        experienceRanges: without.includes(range)
          ? without.filter((r) => r !== range)
          : [...without, range],
      };
    });
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const activeFilterCount = countActiveFilters(filters);

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Service Type</h3>
        <div className="space-y-3">
          {SERVICE_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.serviceTypes.includes(type)}
                onCheckedChange={() => toggleServiceType(type)}
              />
              <Label
                htmlFor={`type-${type}`}
                className="font-normal cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Experience Level</h3>
        <div className="space-y-3">
          {EXPERIENCE_RANGES.map((exp) => (
            <div key={exp} className="flex items-center space-x-2">
              <Checkbox
                id={`exp-${exp}`}
                checked={filters.experienceRanges.includes(exp)}
                onCheckedChange={() => toggleExperienceRange(exp)}
              />
              <Label
                htmlFor={`exp-${exp}`}
                className="font-normal cursor-pointer"
              >
                {exp}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Max Price (Monthly)</h3>
        <Slider
          defaultValue={[MAX_PRICE]}
          max={MAX_PRICE}
          step={1000}
          value={[filters.maxPrice]}
          onValueChange={(values: number[]) =>
            setFilters((prev) => ({ ...prev, maxPrice: values[0] }))
          }
          className="mb-2"
        />
        <div className="text-sm text-muted-foreground">
          Up to ₹{filters.maxPrice.toLocaleString()}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="ghost" className="w-full" onClick={resetFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
              {activeFilterCount > 0 && (
                <Badge className="ml-auto">{activeFilterCount}</Badge>
              )}
            </div>
            <FilterContent />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
            <div className="relative w-full max-w-md">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or service type..."
                className="pl-9"
                value={filters.search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="md:hidden w-full sm:w-auto relative"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              <div className="text-sm text-muted-foreground whitespace-nowrap hidden sm:block">
                {filtered.length === HELPERS?.length
                  ? `Showing ${filtered.length} helpers`
                  : `${filtered.length} of ${HELPERS?.length ?? 0} helpers`}
              </div>
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg font-medium mb-2">
                No helpers match your filters
              </p>
              <p className="text-sm mb-4">
                Try adjusting or clearing your filters.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((helper) => (
              <Card
                key={helper.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-border/50 flex flex-col"
              >
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                      <AvatarImage src={helper.user.profilePic} />
                      <AvatarFallback>{helper.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {helper.isVerified && (
                      <Badge
                        variant="secondary"
                        className="bg-accent/10 text-accent-foreground border-accent/20"
                      >
                        <ShieldCheck className="w-3 h-3 mr-1 text-accent" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{helper.user.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {helper.type} • {helper.experience} exp
                  </p>
                  <div className="flex items-center gap-1 mb-2 text-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium">{helper.averageRating}</span>
                    <span className="text-muted-foreground">
                      ({helper.totalReviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t bg-muted/20 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Starting from
                    </p>
                    <p className="font-semibold text-primary">
                      {helper.costPerHour}/hr
                    </p>
                  </div>
                  <Link to={`/helper/${helper.userId}`}>
                    <Button size="sm">View Profile</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
