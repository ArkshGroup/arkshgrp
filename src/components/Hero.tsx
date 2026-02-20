export default function Hero() {
  return (
    <>
      {/* Hero Background */}
      <div
        className="w-full h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://arkshgroup.com/uploads/about/WhatsApp%20Image%202025-07-21%20at%2010.42.17%20AM.jpeg')",
        }}
      />

      {/* Content Section */}
      <section className="w-full bg-white text-gray-900 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Unlocking Boundless Possibilities: Our Multiverse of Success!
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-600">
                The business journey of Arksh Group, formerly known as R. K
                Associates, started back in 1978 A.D when{" "}
                <strong>Dr. Rajesh Kazi Shrestha</strong>, an energetic, young,
                proactive entrepreneur established Rajesh Concern with the
                objective of trade and hospitality business...
              </p>

              <button className="bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                Read More
              </button>
            </div>

            {/* Right Image Card */}
            <div className="w-full h-65 sm:h-80 md:h-95 lg:h-112.5 rounded-2xl shadow-2xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://arkshgroup.com/uploads/about/Lumbini-celebrating-45-years-copy.jpg')",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
