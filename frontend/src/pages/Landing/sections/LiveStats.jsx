export default function LiveStats({ stats }) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }
  