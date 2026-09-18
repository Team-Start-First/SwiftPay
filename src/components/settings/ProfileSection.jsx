import { useState } from "react";
import { FiCamera, FiCheck } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { getDisplayName, getInitials } from "../../utils/userDisplay";

/**
 * Avatar upload assumes a public Supabase Storage bucket named "avatars".
 * Create it once in your Supabase dashboard (Storage → New bucket →
 * "avatars", set Public) if it doesn't exist, or change BUCKET below.
 */
const BUCKET = "avatars";

const ProfileSection = () => {
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState(getDisplayName(user));
  const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const initials = getInitials(fullName);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(filePath, file, {
        upsert: true,
      });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
    } catch (err) {
      setError(err.message || "Couldn't upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        data: { full_name: fullName, phone, avatar_url: avatarUrl },
      });
      if (updateError) throw updateError;
      setUser(data.user);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message || "Couldn't save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="rounded-2xl bg-white/70 backdrop-blur-lg border border-white/70 p-6 space-y-5"
    >
      <h2 className="text-base font-bold text-slate-900">Profile</h2>

      <div className="flex items-center gap-4">
        <div className="relative">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
              {initials}
            </div>
          )}
          <label
            htmlFor="avatar-upload"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50"
          >
            <FiCamera size={13} className="text-slate-600" />
          </label>
          <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>
        <div className="text-sm text-slate-500">
          {uploading ? "Uploading..." : "Click the camera icon to change your photo"}
        </div>
      </div>

      <div>
        <label htmlFor="full-name" className="text-xs font-semibold text-slate-600">
          Full name
        </label>
        <input
          id="full-name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-xs font-semibold text-slate-600">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 800 000 0000"
          className="mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">Email</label>
        <input
          type="email"
          value={user?.email || ""}
          disabled
          className="mt-1.5 w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-500 cursor-not-allowed"
        />
        <p className="text-xs text-slate-400 mt-1">Changing your email requires a separate verification flow.</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 transition-opacity"
      >
        {saved && <FiCheck size={15} />}
        {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
      </button>
    </form>
  );
};

export default ProfileSection;
