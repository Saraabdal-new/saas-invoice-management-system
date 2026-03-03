import { Receipt } from "lucide-react";

export default function Navbar({ scrollToAuth }) {
  return (
    <nav className="relative z-50 border-b border-amber-500/20 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50">
            <Receipt className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">SMBill</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={scrollToAuth} className="text-amber-400 hover:text-amber-300 transition">Login</button>
          <button onClick={scrollToAuth} className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-black px-4 py-2 rounded shadow-lg">Get Started</button>
        </div>
      </div>
    </nav>
  );
}
