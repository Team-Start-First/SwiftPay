import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
 
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailConfirmed from "./pages/EmailConfirmed";
import Dashboard from "./pages/Dashboard";
import Transfers from "./pages/Transfers";
import Wallets from "./pages/Wallets";
import Cards from "./pages/Cards";
import Settings from "./pages/Settings";
 
function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AuthProvider>
  );
}
 
export default App;