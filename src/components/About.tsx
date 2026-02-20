export default function About() {
  return (
    <section
      id="about"
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="w-full h-65 sm:h-80 md:h-95 lg:h-112.5 rounded-2xl shadow-2xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://arkshgroup.com/uploads/about/Rajesh-Kazi-Shrestha-Arksh-Group-1536x1023%20(1).jpg')",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Chairman & Managing Director
            </h2>

            <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-5">
              Dr Rajesh Kazi Shrestha
            </h3>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5">
              Dr Rajesh Kazi Shrestha's business journey started four decades
              ago. Since then he has come a long way. His hard work has been
              recognized with various medals and appreciation from the
              Government of Nepal for his contribution to the business sector.
            </p>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              He also received an honorary Doctorate from the International
              Journal of Non-Aligned Countries & Foreign Policy Research
              Institute (FPRI) and served as a former Assistant Minister of the
              Ministry of Industry, Commerce & Supplies.
            </p>

            <button className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
