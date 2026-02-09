import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineLink,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineClipboard,
  HiOutlineCheck,
  HiOutlinePlus,
  HiOutlineMinus,
} from "react-icons/hi2";
import { shortenUrl } from "../services/api";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b-2 border-black">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left hover:bg-neutral-50 px-2 md:px-4"
      >
        <span className="text-base md:text-xl font-black uppercase tracking-tight pr-4">
          {question}
        </span>
        {isOpen ? (
          <HiOutlineMinus className="flex-shrink-0" />
        ) : (
          <HiOutlinePlus className="flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 px-2 md:px-4 text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const [input, setInput] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await shortenUrl(input, customCode);
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section
        id="shorten"
        className="section-padding pt-32 md:pt-48 border-b-2 border-black min-h-screen flex items-center bg-white overflow-hidden"
      >
        <div className="max-width w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-24 items-center">
          <div className="z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 md:mb-6"
            >
              <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                Global Protocol v1.0
              </span>
            </motion.div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-[6rem] font-black tracking-tighter leading-[0.85] uppercase mb-8 md:mb-10"
            >
              Link <br /> Engineering.
            </motion.h1>
            <div className="flex flex-col gap-4">
              <p className="text-lg md:text-xl text-neutral-400 font-medium max-w-sm">
                Transforming raw data into high-performance branded assets.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  Auto-expiry: 90 Days
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 md:p-8 border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] z-20"
          >
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 md:mb-8 border-b border-neutral-100 pb-4">
              Shortener Module
            </h3>
            <form
              onSubmit={handleShorten}
              className="flex flex-col gap-5 md:gap-6"
            >
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  Destination URL
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  className="input-brutalist"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  Custom Identifier (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. sale-2026"
                  className="input-brutalist"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-brutalist w-full"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <HiOutlineArrowRight /> Generate Link
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-2 border-black"
                >
                  <div className="flex items-center justify-between gap-3 bg-neutral-50 p-3 md:p-4 border-2 border-black overflow-hidden">
                    <span className="text-base md:text-xl font-black truncate">
                      {result.shortUrl}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(result.shortUrl);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-3 bg-black text-white hover:bg-neutral-800 flex-shrink-0"
                    >
                      {copied ? (
                        <HiOutlineCheck className="text-xl" />
                      ) : (
                        <HiOutlineClipboard className="text-xl" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-black py-6 md:py-8 border-b-2 border-black overflow-hidden flex">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/80 mx-6 md:mx-10"
            >
              Sub-40ms Speed • Brutalist Layout • CDN Edge • 90-Day Lifespan
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section
        id="features"
        className="section-padding border-b-2 border-black bg-neutral-50"
      >
        <div className="max-width">
          <header className="mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Superior <br /> Capability.
            </h2>
            <p className="text-neutral-500 font-medium max-w-xs text-sm md:text-base">
              Stripped of bloat. Engineered for raw performance and
              architectural clarity.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-black">
            {[
              {
                icon: <HiOutlineBolt />,
                title: "Edge Access",
                desc: "Redirects happen at the nearest node for zero latency.",
              },
              {
                icon: <HiOutlineChartBar />,
                title: "Hard Data",
                desc: "Granular click tracking without invading user privacy.",
              },
              {
                icon: <HiOutlineShieldCheck />,
                title: "Secure",
                desc: "Built-in protection against link injection and malware.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`p-10 md:p-16 bg-white flex flex-col items-start border-black border-b-2 md:border-b-0 ${i !== 2 ? "md:border-r-2" : ""} hover:bg-black hover:text-white transition-all group`}
              >
                <div className="text-4xl md:text-5xl mb-6 md:mb-10 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase mb-3 md:mb-4 tracking-tighter">
                  {f.title}
                </h3>
                <p className="font-medium opacity-50 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="section-padding border-b-2 border-black bg-white"
      >
        <div className="max-width grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="order-2 lg:order-1 aspect-square border-4 border-black bg-neutral-50 flex items-center justify-center p-12 md:p-20 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
            <HiOutlineLink className="text-[8rem] sm:text-[12rem] text-black" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-8 md:mb-12">
              The Protocol.
            </h2>
            <div className="space-y-10 md:space-y-16">
              {[
                {
                  n: "01",
                  t: "Ingestion",
                  d: "URL normalization and security sanitization.",
                },
                {
                  n: "02",
                  t: "Encoding",
                  d: "Generation of unique collision-resistant identifiers.",
                },
                {
                  n: "03",
                  t: "Purge",
                  d: "Automated deletion exactly 90 days post-creation.",
                },
              ].map((s, i) => (
                <div key={i} className="flex gap-6 md:gap-10">
                  <span className="text-xl md:text-2xl font-black text-neutral-200">
                    {s.n}
                  </span>
                  <div>
                    <h4 className="text-base md:text-lg font-black uppercase mb-1 md:mb-2">
                      {s.t}
                    </h4>
                    <p className="text-neutral-500 text-xs md:text-sm font-medium leading-relaxed">
                      {s.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="section-padding border-b-2 border-black bg-neutral-50"
      >
        <div className="max-width">
          <h2 className="text-center text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-12 md:mb-20">
            Fixed Pricing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-black">
            {[
              {
                name: "Core",
                price: "$0",
                f: ["1,000 Links", "90 Day Life", "Basic Stats"],
              },
              {
                name: "Pro",
                price: "$12",
                f: ["Unlimited", "Custom Slug", "24/7 Support"],
              },
              {
                name: "Elite",
                price: "Custom",
                f: ["API Access", "No Expiry", "99.9% SLA"],
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`p-8 md:p-12 bg-white flex flex-col items-center text-center border-black border-b-2 md:border-b-0 ${i !== 2 ? "md:border-r-2" : ""} hover:bg-neutral-100 transition-colors`}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neutral-400">
                  {p.name}
                </span>
                <span className="text-4xl md:text-5xl font-black mb-8">
                  {p.price}
                </span>
                <ul className="space-y-3 mb-10">
                  {p.f.map((feat, idx) => (
                    <li
                      key={idx}
                      className="text-[10px] font-black uppercase tracking-widest text-neutral-500"
                    >
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="section-padding border-b-2 border-black bg-white"
      >
        <div className="max-width max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 md:mb-16 text-center">
            Protocol FAQ.
          </h2>
          <div className="border-t-2 border-black">
            <FAQItem
              question="Why do links expire?"
              answer="To maintain high performance and clear out dormant data, all free links are purged after 90 days."
            />
            <FAQItem
              question="Is it secure?"
              answer="We use MongoDB Atlas encryption and Node.js isolation for every single redirect."
            />
            <FAQItem
              question="Custom Aliases?"
              answer="Yes, you can define your own identifiers for better branding and memorability."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-black text-white text-center">
        <div className="max-width py-12 md:py-20">
          <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-10">
            The <br /> Standard.
          </h2>
          <p className="text-sm md:text-lg font-medium text-neutral-400 mb-12 max-w-xl mx-auto px-4">
            Join the world's most disciplined URL management system. Engineered
            for those who value precision over noise.
          </p>
          <a
            href="#shorten"
            className="inline-block bg-white text-black px-8 md:px-12 py-5 md:py-6 font-black uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors text-xs md:text-sm"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
