import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Household/Home";
import LoginPage from "./pages/Household/Login";
import BrowsePage from "./pages/Household/Browse";
import ProfileDetailPage from "./pages/Household/ProfileDetail";
import BookingFlowPage from "./pages/Household/BookingFlow";
import MyBookingsPage from "./pages/Household/MyBookings";
import AccountPage from "./pages/Household/Account";
import HelperDashboardPage from "./pages/Helper/Dashboard";
import HelperProfileSetupPage from "./pages/Helper/ProfileSetup";
import HelperJobHistoryPage from "./pages/Helper/JobHistory";
import AdminDashboardPage from "./pages/Admin/Dashboard";
import AdminVerificationQueuePage from "./pages/Admin/VerificationQueue";
import AdminManageUsersPage from "./pages/Admin/ManageUsers";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { HouseholdLayout } from "./components/HouseholdLayout";
import { DashboardLayout } from "./components/DashboardLayout";
import { Auth } from "./config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "./components/Spinner";

export function App() {
  const [, loading] = useAuthState(Auth);

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HouseholdLayout>
              <HomePage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/login"
          element={
            <HouseholdLayout>
              <LoginPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/browse"
          element={
            <HouseholdLayout>
              <BrowsePage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/helper/:id"
          element={
            <HouseholdLayout>
              <ProfileDetailPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/book/:id"
          element={
            <HouseholdLayout>
              <BookingFlowPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/bookings"
          element={
            <HouseholdLayout>
              <MyBookingsPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/account"
          element={
            <HouseholdLayout>
              <AccountPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/helper"
          element={
            <DashboardLayout role="helper">
              <HelperDashboardPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/helper/profile"
          element={
            <DashboardLayout role="helper">
              <HelperProfileSetupPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/helper/history"
          element={
            <DashboardLayout role="helper">
              <HelperJobHistoryPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/helper/*"
          element={
            <DashboardLayout role="helper">
              <Navigate to="/helper" replace />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <DashboardLayout role="admin">
              <AdminDashboardPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/verifications"
          element={
            <DashboardLayout role="admin">
              <AdminVerificationQueuePage />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/users"
          element={
            <DashboardLayout role="admin">
              <AdminManageUsersPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/*"
          element={
            <DashboardLayout role="admin">
              <Navigate to="/admin" replace />
            </DashboardLayout>
          }
        />
      </Routes>
      <RoleSwitcher />
    </BrowserRouter>
  );
}
