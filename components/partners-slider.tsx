"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules"
// Import Swiper types
import type { Swiper as SwiperType } from "swiper"

// Partner data
const partners = [
  {
    name: "Amazon",
    description: "Strategic shipping partner for e-commerce deliveries nationwide.",
  },
  {
    name: "FedEx",
    description: "Collaborative logistics solutions for time-sensitive shipments.",
  },
  {
    name: "UPS",
    description: "Joint operations for efficient package delivery services.",
  },
  {
    name: "Walmart",
    description: "Dedicated fleet services for retail distribution networks.",
  },
  {
    name: "Power DAT",
    description: "Technology integration for load matching and capacity optimization.",
  },
  {
    name: "Target",
    description: "Retail distribution and supply chain logistics partner.",
  },
  {
    name: "Costco",
    description: "Bulk shipping and warehouse distribution services.",
  },
]

// Helper function to get different gradients for each partner
function getGradient(index: number): string {
  const gradients = [
    "from-blue-600 to-blue-400",
    "from-indigo-600 to-indigo-400",
    "from-cyan-600 to-cyan-400",
    "from-sky-600 to-sky-400",
    "from-blue-600 to-cyan-400",
  ]
  return gradients[index % gradients.length]
}

export default function PartnersSlider() {
  const [activePartner, setActivePartner] = useState<number | null>(null)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme === "light"

  // Function to handle slide change event
  const handleSlideChange = () => {
    // You can add custom logic here when slides change
    console.log("Slide changed", swiper?.activeIndex)
  }

  return (
    <div className="styles_partners__r0KjB p-block-80">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Our Trusted Partners
        </h2>
        <p className={`mt-4 text-lg ${isLight ? "text-gray-600" : "text-slate-400"} max-w-2xl mx-auto`}>
          We collaborate with industry leaders to deliver exceptional logistics solutions.
        </p>
      </motion.div>

      {/* Slider Container */}
      <div className="styles_partners_swiper__cwOLH">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          className="swiper swiper-initialized swiper-horizontal"
          breakpoints={{
            // When window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // When window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // When window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={partner.name}>
              <motion.div
                className="relative px-4 py-2"
                onMouseEnter={() => setActivePartner(index)}
                onMouseLeave={() => setActivePartner(null)}
              >
                <div
                  className={`
                    relative group overflow-hidden rounded-xl p-6 h-40
                    ${
                      isLight
                        ? "bg-white border border-gray-200 shadow-md hover:shadow-lg"
                        : "bg-slate-900/80 border border-slate-800 hover:border-blue-500"
                    }
                    transition-all duration-300 flex items-center justify-center
                  `}
                >
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300
                  `}
                  />

                  <motion.div
                    className="relative z-10 w-full h-full flex items-center justify-center"
                    animate={activePartner === index ? { scale: 0.9 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className={`flex flex-col items-center justify-center ${isLight ? "text-gray-800" : "text-white"}`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${getGradient(index)} flex items-center justify-center mb-3`}
                      >
                        <span className="text-white text-xl font-bold">{partner.name.charAt(0)}</span>
                      </div>
                      <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {partner.name}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`
                      absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t 
                      ${isLight ? "from-white via-white/90 to-transparent" : "from-slate-900 via-slate-900/90 to-transparent"}
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={activePartner === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`text-center text-sm ${isLight ? "text-gray-700" : "text-slate-300"}`}>
                      {partner.description}
                    </p>
                  </motion.div>
                </div>
                <div className="text-center mt-3">
                  <h3 className={`font-medium ${isLight ? "text-gray-800" : "text-white"}`}>{partner.name}</h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-70"></div>
          <div
            className={`relative px-7 py-4 rounded-full ${isLight ? "bg-white" : "bg-slate-900"} border ${isLight ? "border-gray-200" : "border-slate-800"}`}
          >
            <p className={`text-center text-sm ${isLight ? "text-gray-700" : "text-slate-300"}`}>
              Interested in becoming a partner?{" "}
              <span className="text-blue-500 font-medium">Contact our partnership team</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

