import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Eye, EyeOff } from "lucide-react";

export default function AuthSection({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  return (
    <section id="auth-section" className="relative z-10 py-20 px-6 max-w-md mx-auto">
      <Tabs value={authTab} onValueChange={setAuthTab} className="bg-black/50 backdrop-blur-xl border border-amber-500/20 p-6 rounded-lg shadow-lg shadow-amber-500/30">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={e => { e.preventDefault(); onLogin(); }} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-amber-400 text-black py-2 rounded">Login</button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={e => e.preventDefault()} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input type="text" placeholder="John Doe" required />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-amber-400 text-black py-2 rounded">Sign Up</button>
          </form>
        </TabsContent>
      </Tabs>
    </section>
  );
}
