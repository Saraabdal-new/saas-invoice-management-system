export default function SocialProof({ testimonials }) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-linear-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">Trusted by 5,000+ users worldwide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-black/50 backdrop-blur-xl p-6 rounded-lg shadow-lg shadow-amber-500/20">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4"/>
              <div className="text-amber-400 mb-2">{t.rating}★</div>
              <div className="text-gray-300">{t.quote}</div>
              <div className="text-gray-500 mt-2">{t.name}, {t.role}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  