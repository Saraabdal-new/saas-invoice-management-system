import { ArrowRight } from "lucide-react";

export default function Hero({ scrollToAuth }) {
  return (
    <section className="relative z-10 pt-20 pb-32 px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
        Invoice Smarter, <br /> Get Paid Faster
      </h1>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
        Complete invoicing solution for freelancers & small businesses. Create professional invoices, track payments, and manage clients—all in one place.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={scrollToAuth} className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-black h-14 px-8 text-lg flex items-center justify-center gap-2 rounded shadow-lg">
          Start Free Trial <ArrowRight className="w-5 h-5"/>
        </button>
        <button onClick={scrollToAuth} className="border border-amber-500/20 bg-black/40 text-white hover:bg-amber-500/10 h-14 px-8 text-lg backdrop-blur-sm rounded">
          Watch Demo
        </button>
      </div>
    </section>
  );
}
