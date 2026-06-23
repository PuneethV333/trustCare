/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  Loader2,
  Chrome,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import {
  useGetMe,
  useJoinAsHelper,
  useCompleteOnBoarding,
} from "../../hooks/useAuth";
import { signInViaGoogle, signUpViaEmail } from "../../service/auth.service";
import { createMaid } from "../../types/user.types";

// ─── constants ────────────────────────────────────────────────────────────────

const CITIES = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Pune"];
const AREAS: Record<string, string[]> = {
  Mumbai: ["Andheri", "Bandra", "Powai", "Juhu", "Malad"],
  Bangalore: [
    "Koramangala",
    "Indiranagar",
    "HSR Layout",
    "Whitefield",
    "BTM Layout",
  ],
  Delhi: ["Lajpat Nagar", "Dwarka", "Rohini", "Saket", "Vasant Kunj"],
  Hyderabad: [
    "Banjara Hills",
    "Madhapur",
    "Gachibowli",
    "Kondapur",
    "Begumpet",
  ],
  Chennai: ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "OMR"],
  Pune: ["Koregaon Park", "Baner", "Hinjewadi", "Kothrud", "Aundh"],
};

const PLAN_TYPES = ["hourly", "monthly", "yearly"] as const;
type PlanType = (typeof PLAN_TYPES)[number];

interface PlanRow {
  type: PlanType;
  cost: string;
  dailyWorkingHours: string;
  duration: string;
}

// ─── step tracker ─────────────────────────────────────────────────────────────

const STEPS = ["Create account", "Your profile", "Set plans"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5 min-w-[90px]">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${done ? "bg-accent text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mb-4 transition-colors ${done ? "bg-accent" : "bg-border"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── step 1 — firebase auth + joinAsHelper ────────────────────────────────────

interface Step1Props {
  onSuccess: () => void;
}

function Step1Auth({ onSuccess }: Step1Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { mutateAsync: joinAsHelper } = useJoinAsHelper();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Name is required.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const fbUser = await signUpViaEmail(email, password);
      await joinAsHelper({
        name,
        email: fbUser.email ?? "",
        profilePic: fbUser.photoURL ?? undefined,
      });
      onSuccess();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const fbUser = await signInViaGoogle();
      await joinAsHelper({
        name: fbUser.displayName ?? "",
        email: fbUser.email ?? "",
        profilePic: fbUser.photoURL ?? undefined,
      });
      onSuccess();
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Create your helper account</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Start earning by connecting with trusted households across India.
      </p>

      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 h-11 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium mb-6 disabled:opacity-60"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Chrome className="w-4 h-4" />
        )}
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or with email</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleEmailSignUp} className="flex flex-col gap-4">
        <div>
          <Input
            placeholder="Priya Sharma"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <Input
            type="email"
            placeholder="priya@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <Input
              type={showPw ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="pr-10"
              required
            />

            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <Button type="submit" className="h-11 mt-1" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Create account
          {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </form>
    </div>
  );
}

// ─── step 2 — profile details ─────────────────────────────────────────────────

interface ProfileForm {
  type: "maid" | "nanny" | "babysitter";
  bio: string;
  experience: string;
  city: string;
  area: string;
  costPerHour: string;
  skills: string[];
  skillInput: string;
}

interface Step2Props {
  onNext: (data: Partial<createMaid>) => void;
  onBack: () => void;
}

function Step2Profile({ onNext, onBack }: Step2Props) {
  const [form, setForm] = useState<ProfileForm>({
    type: "maid",
    bio: "",
    experience: "",
    city: "",
    area: "",
    costPerHour: "",
    skills: [],
    skillInput: "",
  });
  const [error, setError] = useState("");

  const set = (key: keyof ProfileForm, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const addSkill = () => {
    const s = form.skillInput.trim();
    if (!s || form.skills.includes(s)) return;
    set("skills", [...form.skills, s]);
    set("skillInput", "");
  };

  const removeSkill = (s: string) =>
    set(
      "skills",
      form.skills.filter((x) => x !== s),
    );

  const handleSkillKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleNext = () => {
    if (!form.experience || isNaN(Number(form.experience)))
      return setError("Enter a valid years of experience.");
    if (!form.costPerHour || isNaN(Number(form.costPerHour)))
      return setError("Enter a valid hourly rate (numbers only).");
    if (form.skills.length === 0) return setError("Add at least one skill.");
    setError("");
    onNext({
      type: form.type,
      bio: form.bio || undefined,
      experience: Number(form.experience),
      city: form.city || undefined,
      area: form.area || undefined,
      costPerHour: form.costPerHour,
      skill: form.skills,
    });
  };

  const areas = form.city ? (AREAS[form.city] ?? []) : [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Build your profile</h2>
      <p className="text-muted-foreground text-sm mb-8">
        This is what households will see when they search for help.
      </p>

      <div className="flex flex-col gap-5">
        {/* Service type */}
        <div>
          <label className="block text-sm font-medium mb-2">Service type</label>
          <div className="flex gap-2">
            {(["maid", "nanny", "babysitter"] as const).map((t) => (
              <button
                key={t}
                onClick={() => set("type", t)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium capitalize transition-colors
                  ${form.type === t ? "border-accent bg-accent/10 text-accent-foreground" : "border-border bg-card text-muted-foreground hover:border-foreground/30"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Experience + rate */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Years of experience
            </label>
            <Input
              type="number"
              min={0}
              placeholder="e.g. 3"
              value={form.experience}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("experience", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Hourly rate (₹)
            </label>
            <Input
              type="number"
              min={0}
              placeholder="e.g. 150"
              value={form.costPerHour}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("costPerHour", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* City + Area */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">City</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={form.city}
            onChange={(e) => {
              set("city", e.target.value);
              set("area", "");
            }}
          >
            <option value="">Select city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Area</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            value={form.area}
            onChange={(e) => set("area", e.target.value)}
            disabled={!form.city}
          >
            <option value="">Select area</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Bio{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Tell households a bit about yourself, your experience, and your strengths…"
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Skills</label>
        <Input
          placeholder="e.g. Cooking, Childcare… press Enter to add"
          value={form.skillInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            set("skillInput", e.target.value)
          }
          onKeyDown={handleSkillKey}
          className="flex-1"
        />

        <Button
          type="button"
          variant="outline"
          onClick={addSkill}
          className="shrink-0"
        >
          Add
        </Button>
      </div>
      {form.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {form.skills.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="flex items-center gap-1 pr-1 bg-accent/10 text-accent-foreground border-accent/20"
            >
              {s}
              <button
                onClick={() => removeSkill(s)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-2">
        <Button variant="outline" onClick={onBack} className="h-11">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext} className="flex-1 h-11">
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// ─── step 3 — plans ───────────────────────────────────────────────────────────

interface Step3Props {
  profileData: Partial<createMaid>;
  onBack: () => void;
}

function Step3Plans({ profileData, onBack }: Step3Props) {
  const navigate = useNavigate();
  const { mutateAsync: completeOnboarding } = useCompleteOnBoarding();
  const [plans, setPlans] = useState<PlanRow[]>([
    { type: "hourly", cost: "", dailyWorkingHours: "", duration: "" },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addPlan = () =>
    setPlans((p) => [
      ...p,
      { type: "monthly", cost: "", dailyWorkingHours: "", duration: "" },
    ]);

  const removePlan = (i: number) =>
    setPlans((p) => p.filter((_, idx) => idx !== i));

  const updatePlan = (i: number, key: keyof PlanRow, val: string) =>
    setPlans((p) =>
      p.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)),
    );

  const handleSubmit = async () => {
    for (const [i, p] of plans.entries()) {
      if (!p.cost || isNaN(Number(p.cost)))
        return setError(`Plan ${i + 1}: enter a valid cost.`);
      if (!p.dailyWorkingHours || isNaN(Number(p.dailyWorkingHours)))
        return setError(`Plan ${i + 1}: enter valid daily working hours.`);
      if (!p.duration || isNaN(Number(p.duration)))
        return setError(`Plan ${i + 1}: enter a valid duration.`);
    }
    setError("");
    setLoading(true);
    try {
      const payload: createMaid = {
        type: profileData.type!,
        bio: profileData.bio,
        experience: profileData.experience!,
        city: profileData.city,
        area: profileData.area,
        costPerHour: profileData.costPerHour!,
        skill: profileData.skill!,
        plans: plans.map((p) => ({
          type: p.type,
          cost: Number(p.cost),
          dailyWorkingHours: Number(p.dailyWorkingHours),
          duration: Number(p.duration),
        })),
      };
      await completeOnboarding(payload);
      navigate("/");
    } catch (err: any) {
      setError(err?.message ?? "Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const planDurationHint: Record<PlanType, string> = {
    hourly: "Hours per session",
    monthly: "Days (e.g. 30)",
    yearly: "Days (e.g. 365)",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Set your plans</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Define what you offer and at what price. You can add multiple plans.
      </p>

      <div className="flex flex-col gap-4">
        {plans.map((plan, i) => (
          <Card key={i} className="p-4 border-border/60 relative">
            {plans.length > 1 && (
              <button
                title="any"
                onClick={() => removePlan(i)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
              Plan {i + 1}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Type */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1.5">
                  Plan type
                </label>
                <div className="flex gap-2">
                  {PLAN_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => updatePlan(i, "type", t)}
                      className={`flex-1 py-1.5 rounded-md border text-sm capitalize transition-colors
                        ${plan.type === t ? "border-accent bg-accent/10 text-accent-foreground font-medium" : "border-border text-muted-foreground hover:border-foreground/30"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Cost (₹)
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 500"
                  value={plan.cost}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePlan(i, "cost", e.target.value)}
                />
              </div>

              {/* Daily working hours */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Daily working hours
                </label>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  placeholder="e.g. 4"
                  value={plan.dailyWorkingHours}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updatePlan(i, "dailyWorkingHours", e.target.value)
                  }
                />
              </div>

              {/* Duration */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1.5">
                  Duration — {planDurationHint[plan.type]}
                </label>
                <Input
                  type="number"
                  min={1}
                  placeholder={
                    plan.type === "hourly"
                      ? "e.g. 4"
                      : plan.type === "monthly"
                        ? "30"
                        : "365"
                  }
                  value={plan.duration}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePlan(i, "duration", e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}

        <button
          onClick={addPlan}
          className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          <Plus className="w-4 h-4" /> Add another plan
        </button>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onBack}
            className="h-11"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-11"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving…
              </>
            ) : (
              <>
                Finish & go live <CheckCircle2 className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function JoinAsHelperPage() {
  const { data: me, isLoading } = useGetMe();
  const [step, setStep] = useState(0);
  const [profileData, setProfileData] = useState<Partial<createMaid>>({});

  // Resume at step 2 if the user already has a Firebase session + helper account
  // but hasn't completed onboarding (no maidProfile yet)
  useEffect(() => {
    if (isLoading) return;
    if (me?.role === "HELPER" && !(me as any).maidProfile) {
      setStep(1);
    }
  }, [me, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — value prop */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 bg-primary text-primary-foreground p-12">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-accent" />
          <span className="font-bold text-xl tracking-tight">TrustCare</span>
        </div>

        <div>
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            For helpers
          </p>
          <h2 className="text-3xl font-bold leading-snug mb-6">
            Earn steadily with families who value your work.
          </h2>
          <ul className="flex flex-col gap-4 text-primary-foreground/80 text-sm">
            {[
              "Verified households — no guesswork about employers",
              "Flexible plans — hourly, monthly, or yearly bookings",
              "Transparent ratings that build your reputation",
              "₹1Cr insurance cover for every helper on the platform",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} TrustCare India Pvt. Ltd.
        </p>
      </div>

      {/* Right panel — wizard */}
      <div className="flex-1 flex items-start justify-center px-6 py-16 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <Shield className="h-5 w-5 text-accent" />
            <span className="font-bold text-lg tracking-tight text-primary">
              TrustCare
            </span>
          </div>

          <StepBar current={step} />

          {step === 0 && <Step1Auth onSuccess={() => setStep(1)} />}
          {step === 1 && (
            <Step2Profile
              onNext={(data) => {
                setProfileData(data);
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <Step3Plans profileData={profileData} onBack={() => setStep(1)} />
          )}
        </div>
      </div>
    </div>
  );
}
