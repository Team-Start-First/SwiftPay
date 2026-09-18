import { FiMail, FiMessageCircle, FiFileText } from "react-icons/fi";

const LINKS = [
  { icon: FiMessageCircle, label: "Chat with support", detail: "Usually replies within a few minutes", href: "#" },
  { icon: FiMail, label: "Email us", detail: "support@swiftpay.app", href: "mailto:support@swiftpay.app" },
  { icon: FiFileText, label: "Help center", detail: "Guides and FAQs", href: "#" },
];

const HelpSupportCard = () => (
  <div className="rounded-2xl bg-white/70 backdrop-blur-lg border border-white/70 p-6">
    <h2 className="text-base font-bold text-slate-900 mb-1">Help &amp; support</h2>
    <p className="text-xs text-slate-500 mb-4">Need a hand? Here's how to reach us.</p>

    <div className="space-y-2">
      {LINKS.map(({ icon: Icon, label, detail, href }) => (
        <a
          key={label}
          href={href}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-colors"
        >
          <span className="w-9 h-9 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <Icon size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">{label}</p>
            <p className="text-xs text-slate-500">{detail}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default HelpSupportCard;
