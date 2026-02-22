'use client'

import React from 'react'
import {
  HomeIcon,
  LightBulbIcon,
  StarIcon,
  UserIcon,
  ShareIcon,
  ArrowUpRightIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import logo2 from '@/assets/logo/logo2.png'
import Image from 'next/image'
import Link from 'next/link'
import PageBanner from './PageBanner'

export default function ArkshismSection() {
  return (
    <main className="bg-white font-sans min-h-screen pb-24">
      {/* 1. Header Banner */}
      <PageBanner
        title="Arkshism"
        padding="py-12 px-6"
        width="w-425 mx-auto"
        textAlign="center"
        breadcrumb={[{ name: 'Home', href: '/', icon: <HomeIcon /> }, { name: 'Arkshism' }]}
      />
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* 2. Philosophy Hero Card */}
        <div className="bg-[#3498db] rounded-[30px] p-12 text-center text-white shadow-xl mb-16 relative">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <LightBulbIcon className="w-12 h-12 text-[#3498db]" />
            </div>
            <h2 className="text-4xl font-bold">Arkshism</h2>
            <div className="w-16 h-1 bg-white/50 rounded-full my-2"></div>
            <p className="max-w-3xl text-lg leading-relaxed font-medium">
              The guiding philosophy behind this identity and visual representation of logo is known
              as Arkshism, a concept rooted in aspiration and stellar excellence.
            </p>
          </div>
        </div>

        {/* 3. Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <PillarCard
            icon={<StarIcon className="w-10 h-10" />}
            title="ARKSH means"
            desc="The name 'ARKSH' was chosen by the CEO of Arksh Group, Rajul Shrestha. The name ARKSH is of Sanskrit origin and means 'Of The Stars' or 'Celestial'."
          />
          <PillarCard
            icon={<UserIcon className="w-10 h-10" />}
            title="A Legacy in Letters"
            desc="The pronunciation 'AR=R, K=K, SH=S' aligns with the initials of our Chairman/Managing Director, Rajesh Kazi Shrestha."
          />
          <PillarCard
            icon={<ShareIcon className="w-10 h-10" />}
            title="Interconnections"
            desc="The logo, slogan, and name are correlated and interconnected which emphasize the significance of stars, symbolizing devotion to aim for the highest goals."
          />
        </div>

        {/* 4. Meaning Behind Our Logo (English) */}
        <section className="mb-24">
          <SectionHeader title="Meaning Behind Our Logo" />
          <div className="flex justify-center mb-12">
            <Image
              src={logo2}
              alt="Arksh Logo"
              className="h-50 object-contain p-4 border border-gray-100 rounded-2xl shadow-sm transition-shadow duration-300 
             hover:rotate-3 hover:shadow-[0_10px_20px_rgba(52,152,219,0.4)]"
            />
          </div>
          <p
            className="text-center text-gray-600 text-[18px] mb-12 max-w-2xl mx-auto border border-gray-100 py-6 px-10 rounded-2xl shadow-blue-300 border-t-blue-500 
              transition-shadow duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            The logo comprises stars, a person, and lines, with each element and color conveying a
            specific meaning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LogoDetailCard
              icon={<StarIcon />}
              title="Perspective"
              desc="The dark and light parts of the star in the logo represent the different perspectives that people have. Some individuals may see the dark color as positive side, whilst others may see the light color as positive side, which indicates the idea that everyone can have their own interpretation. The central part of the logo which is transparent represents that regardless of any external factors, we have to be clear and neutral from within"
            />
            <LogoDetailCard
              icon={<StarIcon />}
              title="Star Quality"
              desc="The person within the star symbolizes the idea that every individual is a star, regardless of their position, age, caste, gender, race, or religion. It also signifies that those associated with Arksh Group will be nurtured to develop star qualities and become exceptional performers."
            />
            <LogoDetailCard
              icon={<ArrowUpRightIcon />}
              title="Reaching Higher"
              desc="A person extending their hands to reach a star symbolizes the Arksh Group's collective effort to achieve its vision — To be recognized as an ethical business group committed to empowering and uplifting society through continuous and meaningful efforts."
            />
            <LogoDetailCard
              icon={<TrophyIcon />}
              title="Highest Goals"
              desc="The smaller star in Arksh Group logo represents the organization's goals to attain the pinnacle of success, desiring not just for the finite targets but for the furthest ones."
            />
            <LogoDetailCard
              icon={<SparklesIcon />}
              title="Shooting Star"
              desc="The line above the smaller star in the logo represents shooting stars, which are rare and special. This symbolism reflects that every individual associated with Arksh Group are also rare and special. It also conveys the message that Arksh Group is dedicated to support the aspirations of all individuals and organizations associated with it"
            />
          </div>
        </section>

        {/* 5. Meaning Behind Our Logo (Nepali) */}
        <section>
          <SectionHeader title="अर्कश ग्रुपको लोगोले के चित्रण गर्दछ ?" />
          <div className="flex justify-center mb-12">
            <Image
              src={logo2}
              alt="Arksh Logo"
              className="h-50 object-contain p-4 border border-gray-100 rounded-2xl shadow-sm transition-shadow duration-300 
             hover:rotate-3 hover:shadow-[0_10px_20px_rgba(52,152,219,0.4)]"
            />
          </div>
          <p
            className="text-center text-gray-600 text-[18px] mb-12 max-w-2xl mx-auto border border-gray-100 py-6 px-10 rounded-2xl shadow-blue-300 border-t-blue-500 
              transition-shadow duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            लोगोमा ताराहरू, एक व्यक्ति र रेखाहरू समावेश भएका छन्, जसका प्रत्येक तत्व र रङले विशेष
            अर्थको अनुरूप बुझाउँछ, जसलाई पूर्ण रूपमा तल व्याख्या गरिएको छ।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LogoDetailCard
              icon={<StarIcon />}
              title="दृष्टिकोण"
              desc="लोगोमा भएका ताराहरूको रङिए विभेदले मानिसहरूको भिन्न भिन्न दृष्टिकोणलाई प्रतिबिम्बित गर्दछ। केही व्यक्तिहरूले गाढा रङलाई सकारात्मक पक्षको रूपमा लिन सक्छन्, भने केहीले फिक्का रङलाई लिन सक्छन्। यो उनीहरूको आन्तरिक मानसिकताको प्रतिबिम्ब हो। लोगोको मध्य भागमा रहेको पारदर्शी भागले हामीलाई बाह्य परिस्थिति जतिसुकै प्रतिकूल भए तापनि, हामी आन्तरिक रूपमा स्पष्ट र तटस्थ हुनु पर्दछ भन्ने मनोभावको संकेत गर्दछ।"
            />
            <LogoDetailCard
              icon={<StarIcon />}
              title="उज्ज्वल व्यक्तित्व"
              desc="लोगोको तारा अन्तर्गत चित्रण गरिएको व्यक्तिले, अर्क्श ग्रुपसँग सम्बन्धित सबै व्यक्तिहरू जस्तोसुकै पद, उमेर, जात, लिङ्ग, जाति भएपनि तारा जस्तै उज्ज्वल विशेषता रहेको र सिद्ध कार्य निष्पादक बन्न विकसित गरिनेछ भन्ने धारणालाई प्रतिनिधित्व गर्दछ।"
            />
            <LogoDetailCard
              icon={<ArrowUpRightIcon />}
              title="उच्च लक्ष्यको खोजी"
              desc="तारासम्म पुग्नको लागि हात फैलाउने व्यक्तिले लक्ष्य प्राप्त गर्नको लागि कडा परिश्रम गरिरहेको अर्क्श ग्रुपको प्रतिनिधित्व गर्दछ, जसको उद्देश्य - निरन्तर र सार्थक प्रयासमार्फत समाजलाई सशक्त र उन्नत बनाउने प्रतिबद्धता सहितको नैतिक व्यवसायिक समूहका रूपमा चिनिनु हो।"
            />
            <LogoDetailCard
              icon={<TrophyIcon />}
              title="सर्वोच्च सफलता"
              desc="अर्क्श ग्रुपको लोगोमा रहेको सानो तारले सीमित लक्ष्यहरूका लागि मात्र नभई सबैभन्दा टाढाको लक्ष्य सम्मै सफलताको शिखरमा पुग्ने सङ्गठनको उद्देश्यलाई प्रतिनिधित्व गर्दछ।"
            />
            <LogoDetailCard
              icon={<SparklesIcon />}
              title="टुटेको तारा"
              desc="लोगोको सानो तारा माथिको रेखा टुटेको तारको सूचक हो। टुटेको ताराहरू अति नै दुर्लभ र विशेष हुन्छन् जसको आगादी इच्छाइएका सबै कामनाहरूको पूर्ति हुन्छ भन्ने मान्यता प्रचलित छ, त्यसैले अर्क्श ग्रुपका सबै व्यक्तित्वहरू दुर्लभ विशेषताका धनी र उनीहरू सबैको उन्नति र इच्छा पूर्तिमा अर्क्श ग्रुप सदैव समर्पित रहेको र अर्क्श ग्रुपसँग सम्बन्धित सबै व्यक्तिहरू पनि संगठनात्मक साथै ग्राहकहरूको महत्वकांक्षाहरू प्राप्तिका लागि प्रतिबद्ध रहेको उक्त कुराको प्रतीकात्मक निशानी हो।"
            />
          </div>
        </section>
      </div>
    </main>
  )
}

// Reusable Components
function PillarCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-gray-50 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] group hover:shadow-2xl transition-all duration-500">
      <div className="bg-[#3498db] p-5 rounded-full text-white mb-8 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">{title}</h3>
      <div className="w-14 h-1 bg-[#3498db] mb-6"></div>
      <p className="text-gray-500 leading-relaxed text-[15px]">{desc}</p>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-5xl font-bold text-[#3498db] mb-4">{title}</h2>
      <div className="w-24 h-1 bg-[#3498db] mx-auto"></div>
    </div>
  )
}

function LogoDetailCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col gap-4 text-left group hover:bg-blue-100 hover:shadow-xl transition-all duration-300">
      <div className="bg-[#3498db] p-3 rounded-full text-white w-12 h-12 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <h4 className="text-2xl font-bold text-[#3498db]">{title}</h4>
      <p className="text-[#5d6d7e] leading-relaxed text-[15px]">{desc}</p>
    </div>
  )
}
