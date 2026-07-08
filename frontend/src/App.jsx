import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

import MainLayout from "./layouts/MainLayout";

// Main Pages
import Dashboard from "./pages/Dashboard";
import MedicalReport from "./pages/MedicalReport";
import PrescriptionAnalyzer from "./pages/PrescriptionAnalyzer";
import SymptomChecker from "./pages/SymptomChecker";
import BMI from "./pages/BMI";
import NearbyHospitals from "./pages/NearbyHospitals";
import HealthChat from "./pages/HealthChat";
import NearbyPharmacies from "./pages/NearbyPharmacies";



// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoadingScreen from "./components/LoadingScreen";
export default function App() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking Supabase session
  if (loading) {
  return <LoadingScreen />;
}

  return (
    <Routes>
      {/* ================= AUTH ROUTES ================= */}

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Register />
        }
      />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        element={
          isAuthenticated ? (
            <MainLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* AI Healthcare Tools */}
        <Route path="/medical-report" element={<MedicalReport />} />
        <Route path="/prescription" element={<PrescriptionAnalyzer />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
        <Route path="/health-chat" element={<HealthChat />} />


        {/* Uncomment after creating this page */}
        { <Route path="/pharmacies" element={<NearbyPharmacies />} /> }

        {/* Optional pages (remove later if not needed) */}
      </Route>

      {/* Unknown routes */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}