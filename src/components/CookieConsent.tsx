import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsOpen(true);
    } else if (consent === "granted") {
      // Re-apply granted state on load (Google tags handle some memory themselves, but it's safe to push again)
      window.gtag?.('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
      });
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "granted");
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
    });
    setIsOpen(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "denied");
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
    });
    setIsOpen(false);
  };

  if (!hasMounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] md:w-96 p-6 rounded-[32px] bg-card border border-border shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
          >
            {/* Glossy top highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-full bg-primary/10 text-primary">
                <Cookie className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">We use cookies</h3>
            </div>
            
            <p className="text-sm text-muted-foreground/90 mb-6 leading-relaxed">
              We use cookies to understand how you interact with Dotie and improve your experience. By accepting, you agree to our use of these cookies. See our <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={handleReject}
                className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Reject all
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 px-4 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Accept all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Cookie Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-card border border-border shadow-lg text-muted-foreground hover:text-foreground hover:shadow-xl transition-all hover:scale-105 active:scale-95 group"
          title="Cookie Preferences"
        >
          <Cookie className="w-5 h-5 group-hover:text-primary transition-colors" />
        </motion.button>
      )}
    </>
  );
}
