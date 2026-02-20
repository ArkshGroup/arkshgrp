"use client";

export default function Arkshism() {
  return (
    <section className="py-20 px-4 bg-linear-to-br from-slate-100 to-blue-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Top Card */}
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="https://www.arkshgroup.com/arksh-round.png"
              alt="Arksh Logo"
              className="h-16 w-16 object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Arkshism</h2>

          {/* Underline */}
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded"></div>

          {/* Description */}
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The guiding philosophy behind this identity and visual
            representation of logo is known as Arkshism, a concept rooted in
            inspiration and stellar excellence.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-linear-to-br from-blue-800 to-blue-400 text-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ★
            </div>

            <h3 className="text-xl font-bold mb-3">
              ARKSH means "Of The Stars"
            </h3>

            <p className="text-sm leading-relaxed text-blue-100">
              The name "ARKSH" was chosen by the CEO of Arksh Group. The name
              ARKSH is of Sanskrit origin and means "Of The Stars" or
              "Celestial," representing the group’s aspiration for excellence.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-linear-to-br from-blue-800 to-blue-400 text-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              A
            </div>

            <h3 className="text-xl font-bold mb-3">A Legacy in Letters</h3>

            <p className="text-sm leading-relaxed text-blue-100">
              The pronunciation aligns with the initials of our leadership,
              forming a meaningful and deeply connected brand identity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-linear-to-br from-blue-800 to-blue-400 text-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ⛓
            </div>

            <h3 className="text-xl font-bold mb-3">Interconnections</h3>

            <p className="text-sm leading-relaxed text-blue-100">
              The logo, slogan, and name are interconnected, emphasizing
              devotion to achieving the highest goals and inspiring others.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-14">
          <button className="bg-[#2257A6] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-blue-500 transition flex items-center gap-2">
            Learn More →
          </button>
        </div>
      </div>
    </section>
  );
}
