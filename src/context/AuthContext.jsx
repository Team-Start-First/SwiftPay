import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
 
const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });
 
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
 
    return () => listener.subscription.unsubscribe();
  }, []);
 
  // Added: sign-out helper used by the profile dropdown. Clears the
  // Supabase session and sends the user back to the login screen.
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };
 
  const value = { user, setUser, loading, navigate, signOut };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
 
export const useAuth = () => useContext(AuthContext);
