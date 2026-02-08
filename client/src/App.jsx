import React from "react";
import Navbar from "./components/Navbar";
import ShortenerForm from "./components/ShortenerForm";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight mb-6">
              Make your links <span className="text-primary-600">shorter</span>{" "}
              and more <span className="text-primary-600">powerful</span>.
            </h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-10">
              SwiftLink helps you create clean, trackable short URLs in seconds.
              Perfect for social media, marketing campaigns, and personal use.
            </p>

            <ShortenerForm />
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16 bg-neutral-100/50">
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning Fast",
                desc: "Redirects happen in milliseconds globally.",
              },
              {
                title: "Free Analytics",
                desc: "Track clicks and engagement at no cost.",
              },
              {
                title: "Secure & Reliable",
                desc: "Your data is encrypted and backed up daily.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border border-neutral-200"
              >
                <h3 className="font-bold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-400">
        <p>&copy; {new Date().getFullYear()} SwiftLink. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
