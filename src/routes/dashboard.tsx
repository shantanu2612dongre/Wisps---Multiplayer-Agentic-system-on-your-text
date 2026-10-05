import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
// import { supabase } from "../lib/supabase";
import {
  MessageSquare,
  User,
  Plug,
  HelpCircle,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  Paperclip,
  ChevronDown,
  ChevronRight,
  Monitor,
  Sun,
  Moon,
  CheckCircle2,
  Copy,
  ArrowRight,
  Gift,
  Mail,
  Calendar,
  HardDrive,
  FileText,
  Linkedin,
  X
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

type ViewState = "chat" | "profile" | "integrations" | "support" | "settings";

function DashboardPage() {
  const [activeView, setActiveView] = useState<ViewState>("chat");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-black/[0.04] z-50 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <span className="text-xl font-bold tracking-tight text-black">Dotie</span>
        </div>
        
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 text-sm font-medium hover:bg-black/5 transition-colors text-black bg-white shadow-sm"
          >
            <Gift className="w-4 h-4" />
            Invite
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-black/5 transition-colors shadow-sm"
          >
            <Menu className="w-5 h-5 text-black" />
          </button>
          
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute top-12 right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-black/[0.08] border border-black/[0.08] py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <MenuOption icon={MessageSquare} label="Chat" onClick={() => { setActiveView("chat"); setIsMenuOpen(false); }} isActive={activeView === "chat"} />
                <MenuOption icon={User} label="Profile" onClick={() => { setActiveView("profile"); setIsMenuOpen(false); }} isActive={activeView === "profile"} />
                <MenuOption icon={Plug} label="Integrations" onClick={() => { setActiveView("integrations"); setIsMenuOpen(false); }} isActive={activeView === "integrations"} />
                <MenuOption icon={HelpCircle} label="Support" onClick={() => { setActiveView("support"); setIsMenuOpen(false); }} isActive={activeView === "support"} />
                <MenuOption icon={SettingsIcon} label="Settings" onClick={() => { setActiveView("settings"); setIsMenuOpen(false); }} isActive={activeView === "settings"} />
                <div className="h-px bg-black/[0.04] my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-24 px-4 flex flex-col items-center w-full relative">
        <div className="w-full max-w-[600px] flex flex-col gap-6">
           {activeView === "chat" && <DashboardChat />}
           {activeView === "profile" && <DashboardProfile />}
           {activeView === "integrations" && <DashboardIntegrations />}
           {activeView === "support" && <DashboardSupport />}
           {activeView === "settings" && <DashboardSettings />}
        </div>
      </main>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[24px] p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-black/10 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="text-xl font-semibold text-black mb-1.5">Invite friends</h2>
            <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
              For every person you gift Dotie, you get a free week of Dotie as well.
            </p>
            
            <div className="flex items-center justify-between bg-[#fafafa] border border-black/10 rounded-full p-1.5 pl-4 mb-6">
              <span className="text-[13px] text-black font-medium truncate pr-4">
                https://dotie.ai/invite?referral=6rd1ffco2Z...
              </span>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-black/10 rounded-full text-[13px] font-medium text-black hover:bg-gray-50 transition-colors shadow-sm shrink-0">
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
            </div>
            
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Your friend gets a free week. Tell them to open the link and text Dotie to start. This referral code only works for people new to Dotie.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuOption({ icon: Icon, label, onClick, isActive }: { icon: any, label: string, onClick: () => void, isActive: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-[14.5px] transition-colors text-left
        ${isActive ? "text-black bg-black/[0.03] font-medium" : "text-gray-600 hover:bg-black/[0.02] hover:text-black font-medium"}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

// -------------------------------------------------------------
// CHAT VIEW
// -------------------------------------------------------------
function DashboardChat() {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] justify-between bg-[#fafafa]">
      <div className="flex-1 overflow-y-auto pb-4 flex flex-col gap-4 px-2">
        <div className="text-center w-full">
          <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">17:43</span>
        </div>
        
        {/* User Message */}
        <div className="flex justify-end w-full">
          <div className="bg-blue-500 text-white px-5 py-2.5 rounded-[20px] rounded-br-sm max-w-[80%] text-[15px] leading-relaxed shadow-sm">
            Draft an email for leave approval
          </div>
        </div>
        
        {/* Agent Text */}
        <div className="flex justify-start w-full">
          <div className="bg-gray-100 text-black px-5 py-2.5 rounded-[20px] rounded-bl-sm max-w-[80%] text-[15px] leading-relaxed border border-black/5">
            Here is a clean draft you can use:
          </div>
        </div>
        
        {/* Agent Draft Block */}
        <div className="flex justify-start w-full">
          <div className="bg-white text-black px-6 py-5 rounded-2xl max-w-[90%] text-[14.5px] leading-relaxed border border-black/10 shadow-sm whitespace-pre-wrap font-sans">
            Subject: Leave Application - [Your Name]{"\\n\\n"}Hi [Manager's Name],{"\\n\\n"}I would like to request leave starting from [Start Date] to [End Date] due to [brief reason, e.g., personal matters / family commitments]. I will be back at work on [Return Date].{"\\n\\n"}Before taking leave, I will make sure all my current tasks are wrapped up or handed over to [Colleague's Name]. I will also keep an eye on urgent matters if needed.{"\\n\\n"}Please let me know if this works.{"\\n\\n"}Best regards,{"\\n"}[Your Name]
          </div>
        </div>
        
        {/* Agent Followup */}
        <div className="flex justify-start w-full">
          <div className="bg-gray-100 text-black px-5 py-2.5 rounded-[20px] rounded-tl-sm max-w-[80%] text-[15px] leading-relaxed border border-black/5">
            Does that work, or do you need to add specific dates and details?
          </div>
        </div>
        
        {/* User Message 2 */}
        <div className="flex flex-col items-end w-full mt-2">
          <div className="bg-blue-500 text-white px-5 py-2.5 rounded-[20px] rounded-br-sm max-w-[80%] text-[15px] leading-relaxed shadow-sm">
            Can you directly send it over my mail
          </div>
          <span className="text-[10px] text-gray-400 mt-1 mr-1">Read</span>
        </div>
        
        {/* Agent Response */}
        <div className="flex justify-start w-full">
          <div className="bg-gray-100 text-black px-5 py-2.5 rounded-[20px] rounded-bl-sm max-w-[80%] text-[15px] leading-relaxed border border-black/5">
            Yes, I can send emails directly once you connect your email account.
          </div>
        </div>
        <div className="flex justify-start w-full">
          <div className="bg-gray-100/50 text-gray-400 px-5 py-2.5 rounded-[20px] rounded-tl-sm max-w-[80%] text-[15px] leading-relaxed border border-black/5">
            You can connect your account right here:
          </div>
        </div>
      </div>
      
      {/* Input Bar */}
      <div className="mt-4 shrink-0">
        <div className="flex items-center w-full h-[52px] rounded-full border border-black/10 bg-white px-2 shadow-sm transition-all focus-within:border-black/30 focus-within:ring-4 focus-within:ring-black/5">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-gray-400 hover:text-black transition-colors shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            placeholder="Message Dotie..." 
            className="flex-1 bg-transparent border-none outline-none px-3 text-[15px] text-black font-medium placeholder:text-gray-400 w-full min-w-0"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PROFILE VIEW
// -------------------------------------------------------------
function DashboardProfile() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    phone: "919950061169",
    email: "john.doe@example.com",
    timezone: "India Standard Time - Mumbai, Delhi"
  });
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-black">Profile</h3>
            <p className="text-[13px] text-gray-500 mt-0.5">Manage your profile information.</p>
          </div>
          <button 
            className={`px-4 py-1.5 rounded-full border text-[13px] font-medium transition-colors ${
              hasChanges ? 'border-black text-white bg-black hover:bg-black/90' : 'border-black/10 text-black/50 bg-gray-50 cursor-not-allowed'
            }`}
          >
            Update
          </button>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <Field label="Name" icon={User} value={profileData.name} onChange={(v: string) => {setProfileData({...profileData, name: v}); setHasChanges(true)}} />
          <Field label="Phone" icon={User} value={profileData.phone} onChange={() => {}} disabled />
          <Field label="Email" icon={User} value={profileData.email} onChange={(v: string) => {setProfileData({...profileData, email: v}); setHasChanges(true)}} />
          <Field label="Timezone" icon={User} value={profileData.timezone} onChange={() => {}} type="select" />
        </div>
      </div>
      
      <div className="bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/5">
          <h3 className="font-semibold text-lg text-black">Import Memory</h3>
          <p className="text-[13px] text-gray-500 mt-0.5">Bring over what another AI assistant already knows about you.</p>
        </div>
        <div className="p-5 flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">1</div>
            <div>
              <p className="text-[14px] text-black font-medium mb-3">Copy this prompt into ChatGPT, Claude, Gemini, etc.</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-[13px] font-medium hover:bg-black/5 transition-colors text-black bg-white shadow-sm">
                <Copy className="w-4 h-4" />
                Copy prompt
              </button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">2</div>
            <div className="w-full">
              <p className="text-[14px] text-black font-medium mb-3">Paste what it gives you back here.</p>
              <textarea 
                className="w-full h-32 rounded-xl border border-black/10 bg-gray-50/50 p-4 text-[14px] outline-none focus:border-black/30 focus:ring-4 focus:ring-black/5 transition-all resize-none"
                placeholder="Paste the list your other assistant wrote..."
              ></textarea>
              <button className="mt-4 px-5 py-2.5 rounded-full bg-[#fcf2b6] text-black text-[13px] font-medium hover:bg-[#faeb93] transition-colors shadow-sm">
                Add to memory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, value, onChange, disabled, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-black">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Icon className="w-4 h-4" />
        </div>
        {type === "select" ? (
          <select 
            disabled={disabled}
            className="w-full h-10 rounded-xl border border-black/10 bg-gray-50/50 pl-10 pr-3 text-[14px] outline-none appearance-none cursor-pointer"
          >
            <option>{value}</option>
          </select>
        ) : (
          <input 
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full h-10 rounded-xl border border-black/10 pl-10 pr-3 text-[14px] outline-none focus:border-black/30 focus:ring-4 focus:ring-black/5 transition-all ${disabled ? 'bg-gray-50/80 text-gray-500' : 'bg-gray-50/50 text-black'}`}
          />
        )}
        {type === "select" && <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// INTEGRATIONS VIEW
// -------------------------------------------------------------
function getIntegrationIcon(name: string) {
  switch (name) {
    case "Gmail": return <img src="/dotiegmaillogo.png" alt="Gmail" className="w-6 h-6 object-contain" />;
    case "Outlook": return <img src="/dotieoutlook.png" alt="Outlook" className="w-6 h-6 object-contain" />;
    case "Google Calendar": return <img src="/dotiecalendarlogo.png" alt="Google Calendar" className="w-6 h-6 object-contain" />;
    case "Google Drive": return <img src="/dotiegoogledrive.png" alt="Google Drive" className="w-6 h-6 object-contain" />;
    case "Notion": return <img src="/dotienotionlogo.png" alt="Notion" className="w-6 h-6 object-contain" />;
    case "LinkedIn": return <img src="/dotielinkedinlogo.png" alt="LinkedIn" className="w-6 h-6 object-contain" />;
    default: return <Plug className="w-5 h-5 text-gray-600" />;
  }
}

function DashboardIntegrations() {
  const integrations = [
    { name: "Gmail", desc: "Help with emails." },
    { name: "Google Calendar", desc: "Help with your calendar." },
    { name: "Google Drive", desc: "Help with files." },
    { name: "Outlook", desc: "Help with email and calendar." },
    { name: "Notion", desc: "Read your pages." },
    { name: "LinkedIn", desc: "Help with networking." },
  ];

  return (
    <div className="bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden w-full">
      <div className="p-6 border-b border-black/5">
        <h3 className="font-semibold text-[17px] text-black">Productivity</h3>
        <p className="text-[13px] text-gray-500 mt-0.5">Email, calendar, docs, and tasks.</p>
      </div>
      <div className="p-6 flex flex-col gap-3">
        {integrations.map((integration, idx) => (
          <IntegrationRow 
            key={idx} 
            name={integration.name} 
            desc={integration.desc} 
            status="Connect" 
          />
        ))}
      </div>
    </div>
  );
}

function IntegrationRow({ name, desc, status }: { name: string, desc: string, status: string }) {
  const isConnected = status === "Connected";
  return (
    <div className="flex items-center justify-between p-4 rounded-[16px] border border-black/[0.06] bg-[#fafafa]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-[10px] bg-white border border-black/[0.04] flex items-center justify-center shadow-sm">
          {getIntegrationIcon(name)}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[14px] text-black leading-snug">{name}</span>
          <span className="text-[12.5px] text-gray-500 leading-tight mt-0.5">{desc}</span>
        </div>
      </div>
      {isConnected ? (
        <div className="flex items-center gap-3">
          <span className="text-[12.5px] font-medium text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /> Connected</span>
          <button className="text-[13px] text-gray-400 hover:text-black font-medium transition-colors">Disconnect</button>
        </div>
      ) : (
        <button 
          className="px-5 py-2 rounded-full text-[13px] font-medium text-black transition-transform hover:scale-[1.02] shadow-sm border border-black/5"
          style={{ background: "linear-gradient(165deg, oklch(0.95 0.04 30) 0%, oklch(0.94 0.06 350) 30%, oklch(0.92 0.05 320) 100%)" }}
        >
          Connect
        </button>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SUPPORT VIEW
// -------------------------------------------------------------
function DashboardSupport() {
  const [openRow, setOpenRow] = useState<string | null>(null);
  
  const faqs = [
    { q: "Dotie not responding?", a: "Ensure you have a stable internet connection. If the issue persists, try logging out and logging back in." },
    { q: "Changed your phone number?", a: "You can update your phone number in the Profile tab. A verification code will be sent to the new number." },
    { q: "Need help with something else?", a: "Reach out to us at support@dotie.ai and our team will get back to you within 24 hours." },
    { q: "Delete chat data", a: "You can permanently delete all chat history by sending 'Delete my data' to Dotie." },
  ];

  return (
    <div className="bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden w-full">
      <div className="p-5 border-b border-black/5">
        <h3 className="font-semibold text-lg text-black">Support</h3>
        <p className="text-[13px] text-gray-500 mt-0.5">Get help with Dotie.</p>
      </div>
      <div className="flex flex-col">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-black/[0.03] last:border-0">
            <button 
              onClick={() => setOpenRow(openRow === faq.q ? null : faq.q)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors text-left"
            >
              <span className="font-medium text-[14px] text-gray-700">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openRow === faq.q ? 'rotate-180' : ''}`} />
            </button>
            {openRow === faq.q && (
              <div className="px-5 pb-5 text-[14px] text-gray-500 bg-gray-50/30 pt-1">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SETTINGS VIEW
// -------------------------------------------------------------
function DashboardSettings() {
  const [appearance, setAppearance] = useState("system");
  const [plan, setPlan] = useState("yearly");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/5">
          <h3 className="font-semibold text-lg text-black">Appearance</h3>
          <p className="text-[13px] text-gray-500 mt-0.5">Choose how Dotie looks on this device.</p>
        </div>
        <div className="p-5 flex items-center gap-6">
          <RadioOption icon={Monitor} label="System" value="system" selected={appearance === "system"} onSelect={setAppearance} />
          <RadioOption icon={Sun} label="Light" value="light" selected={appearance === "light"} onSelect={setAppearance} />
          <RadioOption icon={Moon} label="Dark" value="dark" selected={appearance === "dark"} onSelect={setAppearance} />
        </div>
      </div>
      
      <div className="bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden pb-6">
        <div className="p-5 border-b border-black/5">
          <h3 className="font-semibold text-lg text-black">Billing</h3>
          <p className="text-[13px] text-gray-500 mt-0.5">Get access to Dotie and manage your plan.</p>
        </div>
        <div className="p-5 flex flex-col items-center">
          <p className="text-[13px] text-gray-500 mb-4">No commitment, cancel anytime.</p>
          
          <div className="w-full flex flex-col gap-3">
            <button 
              onClick={() => setPlan("yearly")}
              className={`relative w-full p-4 rounded-xl border text-left transition-all ${plan === "yearly" ? 'border-[#0a5742] ring-1 ring-[#0a5742] bg-[#0a5742]/5' : 'border-black/10 hover:border-black/30'}`}
            >
              <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-[#0a5742] text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                Limited: 50% off
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-black text-[15px]">9.99 USD/mo</span>
                  <span className="text-gray-500 text-sm ml-2">· Yearly</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-[14px]">119.99 USD/yr</span>
                  {plan === "yearly" && <CheckCircle2 className="w-5 h-5 text-[#0a5742]" />}
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => setPlan("monthly")}
              className={`w-full p-4 rounded-xl border text-left transition-all ${plan === "monthly" ? 'border-[#0a5742] ring-1 ring-[#0a5742] bg-[#0a5742]/5' : 'border-black/10 hover:border-black/30'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-black text-[15px]">19.99 USD/mo</span>
                  <span className="text-gray-500 text-sm ml-2">· Monthly</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-[14px]">19.99 USD/mo</span>
                  {plan === "monthly" && <CheckCircle2 className="w-5 h-5 text-[#0a5742]" />}
                </div>
              </div>
            </button>
          </div>
          
          <button className="w-full mt-6 py-3.5 rounded-xl bg-[#0a5742] text-white text-[15px] font-medium hover:bg-[#084232] transition-colors flex items-center justify-center gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
          
          <p className="text-[11px] text-gray-400 mt-4 text-center">
            By continuing, you agree to the <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function RadioOption({ icon: Icon, label, value, selected, onSelect }: any) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group" onClick={() => onSelect(value)}>
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selected ? 'border-black' : 'border-gray-300'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-black" />}
      </div>
      <Icon className="w-4 h-4 text-gray-500 group-hover:text-black transition-colors" />
      <span className="text-[14px] text-black font-medium">{label}</span>
    </label>
  );
}
