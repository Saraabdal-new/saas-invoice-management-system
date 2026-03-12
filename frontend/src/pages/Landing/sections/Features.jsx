import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { FileText, Users, BarChart3, Download, Zap, Shield } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Tooltip } from "recharts";
import './globals.css';

export default function Features({ features }) {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-linear-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="border-amber-500/20 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/50">
                    <Icon className="w-6 h-6 text-black"/>
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400 mb-4">{feature.description}</CardDescription>
                  {feature.content}
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
