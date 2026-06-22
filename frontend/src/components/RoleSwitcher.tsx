import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useGetMe } from "../hooks/useAuth";

export function RoleSwitcher() {
  const location = useLocation();
  const { data: user } = useGetMe();
  const currentRole = location.pathname.startsWith("/admin")
    ? "admin"
    : location.pathname.startsWith("/helper")
      ? "helper"
      : "household";

  if (!user) return null;

  if (user.role === "USER") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border shadow-lg rounded-full p-1 flex items-center gap-1">
      <Link to="/">
        <Button
          variant={currentRole === "household" ? "default" : "ghost"}
          size="sm"
          className="rounded-full px-4"
        >
          Household
        </Button>
      </Link>

      {(user.role === "HELPER" || user.role === "ADMIN") && (
        <Link to="/helper">
          <Button
            variant={currentRole === "helper" ? "default" : "ghost"}
            size="sm"
            className="rounded-full px-4"
          >
            Helper
          </Button>
        </Link>
      )}

      {user.role === "ADMIN" && (
        <Link to="/admin">
          <Button
            variant={currentRole === "admin" ? "default" : "ghost"}
            size="sm"
            className="rounded-full px-4"
          >
            Admin
          </Button>
        </Link>
      )}
    </div>
  );
}
