import React from "react";
import Logo from "../components/Logo";

const MainLayout = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-20 border-b-2 border-black px-6 md:px-12 flex items-center justify-between bg-white/90 backdrop-blur-md z-[100]">
        <div className="flex items-center gap-12">
          <button
            onClick={scrollToTop}
            className="hover:opacity-70 transition-opacity flex items-center"
          >
            <Logo
              className="w-6 h-6"
              textClassName="text-sm font-black tracking-tighter uppercase"
            />
          </button>
          <div className="hidden lg:flex gap-8">
            {["Features", "Process", "Pricing", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em]">
            Login
          </button>
          <button
            onClick={scrollToTop}
            className="bg-black text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="py-24 border-t-2 border-black px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <button
              onClick={scrollToTop}
              className="mb-6 hover:opacity-70 transition-opacity"
            >
              <Logo
                className="w-5 h-5"
                textClassName="text-[12px] font-black tracking-tighter uppercase"
              />
            </button>
            <p className="text-xs font-medium text-neutral-400 leading-relaxed">
              Architecting the future of link management through minimalist
              engineering and brutalist design.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">
                Legal
              </span>
              <span className="text-xs font-medium text-neutral-400 hover:text-black cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-xs font-medium text-neutral-400 hover:text-black cursor-pointer">
                Terms of Service
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">
                Connect
              </span>
              <span className="text-xs font-medium text-neutral-400 hover:text-black cursor-pointer">
                Twitter / X
              </span>
              <span className="text-xs font-medium text-neutral-400 hover:text-black cursor-pointer">
                GitHub Repository
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-neutral-100 flex justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300">
            © 2026 SWIFTLINK STUDIOS
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300">
            AUTOMATIC 90-DAY DELETION ACTIVE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
