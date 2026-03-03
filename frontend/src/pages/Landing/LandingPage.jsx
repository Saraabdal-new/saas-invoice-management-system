import { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import LiveStats from "./sections/LiveStats";
import Features from "./sections/Features";
import TargetUsers from "./sections/TargetUsers";
import SocialProof from "./sections/SocialProof";
import AuthSection from "./sections/AuthSection";
import Footer from "./sections/Footer";

export default function LandingPage() {
  const [stats] = useState([
    { value: "5,000+", label: "Active Users" },
    { value: "$2M+", label: "Invoices Processed" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "User Rating" },
  ]);

  const scrollToAuth = () => document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" });

  // Example props for modular components
  const features = [
    // same as before
  ];

  const users = [
    { title: "Freelancers", benefits: ["Quick invoice creation", "Time tracking", "Client portal"] },
    { title: "Small Businesses", benefits: ["Team collaboration", "Multiple currencies", "Tax management"] },
    { title: "Agencies", benefits: ["Project tracking", "Advanced analytics", "Custom branding"] },
  ];

  const testimonials = [
    { avatar: "/avatars/user1.jpg", name: "Alice", role: "Freelancer", rating: 5, quote: "SMBill saved me hours!" },
    { avatar: "/avatars/user2.jpg", name: "Bob", role: "Small Business Owner", rating: 5, quote: "Effortless invoicing!" },
    { avatar: "/avatars/user3.jpg", name: "Carol", role: "Agency Lead", rating: 5, quote: "Professional and fast." },
  ];

  const handleLogin = () => alert("Login submitted!");

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background can stay here as a fixed div */}
      <Navbar scrollToAuth={scrollToAuth} />
      <Hero scrollToAuth={scrollToAuth} stats={stats} />
      <LiveStats stats={stats} />
      <Features features={features} />
      <TargetUsers users={users} />
      <SocialProof testimonials={testimonials} />
      <AuthSection onLogin={handleLogin} />
      <Footer />
    </div>
  );
}
