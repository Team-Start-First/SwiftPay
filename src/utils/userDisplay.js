/**
 * Pure helpers for turning a Supabase `user` object into a display name
 * and initials. Used wherever the app needs to show the signed-in user
 * (DashboardNav, Dashboard greeting, etc.) alongside your existing
 * AuthContext — no separate data-fetching hook needed.
 *
 * Adjust the metadata key order if your SignUp.jsx stores the name
 * under a different key than full_name/name/first_name+last_name.
 */
export const getDisplayName = (user) => {
  if (!user) return "";
  const meta = user.user_metadata || {};
  return (
    meta.full_name ||
    meta.name ||
    [meta.first_name, meta.last_name].filter(Boolean).join(" ") ||
    user.email?.split("@")[0] ||
    "there"
  );
};
 
export const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
};