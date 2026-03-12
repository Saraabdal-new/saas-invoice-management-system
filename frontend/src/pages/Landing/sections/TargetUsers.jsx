export default function TargetUsers({ users }) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-linear-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">Target Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {users.map((user, idx) => (
            <div key={idx} className="bg-black/50 backdrop-blur-xl p-6 rounded-lg shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-white mb-2">{user.title}</h3>
              <ul className="text-gray-300 list-disc pl-5 space-y-1">
                {user.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }
  