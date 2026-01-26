import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Communicate banner height to other components
  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.setProperty('--promo-height', '44px');
    } else {
      document.documentElement.style.setProperty('--promo-height', '0px');
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />
          </div>

          <div className="container-custom mx-auto px-4 py-3 relative">
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="text-lg">🌿</span>
              <p className="text-sm md:text-base font-medium text-white">
                <span className="font-bold">Winter Special!</span> Get 15% OFF all landscaping services this season. 
                <a href="tel:1-512-636-2143" className="underline ml-2 hover:opacity-80 transition-opacity font-bold text-white">
                  Call Now →
                </a>
              </p>
              <span className="text-lg hidden md:inline">🍂</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors text-white"
              aria-label="Close banner"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PromoBanner;
