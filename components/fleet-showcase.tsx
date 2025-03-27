"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/utils/scroll-utils"
import ModernCTAButton from "@/components/modern-cta-button"

const fleetItems = [
  {
    title: "Dry Van Trailers",
    description: "Standard enclosed trailers for general freight, providing protection from the elements.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["53' length capacity", "Up to 45,000 lbs payload", "Air-ride suspension"],
  },
  {
    title: "Refrigerated Trailers",
    description: "Temperature-controlled trailers for perishable goods and sensitive products.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Precise temperature control", "Real-time temperature monitoring", "Backup power systems"],
  },
  {
    title: "Flatbed Trailers",
    description: "Open trailers for oversized or irregularly shaped cargo requiring side loading.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["48' to 53' lengths available", "Specialized securing equipment", "Experienced load securement"],
  },
]

export default function FleetShowcase() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % fleetItems.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + fleetItems.length) % fleetItems.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-slate-700 bg-slate-900/80 backdrop-blur-sm text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500"
          onClick={prev}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>

      <div className="relative h-[500px] overflow-hidden rounded-lg">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-white">{fleetItems[current].title}</h3>
                <p className="text-slate-400 mb-6">{fleetItems[current].description}</p>
                <ul className="space-y-3">
                  {fleetItems[current].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    >
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ModernCTAButton
                    text="Request This Vehicle"
                    onClick={() => scrollToSection("contact")}
                    variant="primary"
                    icon="arrow"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-75"></div>
                <div className="relative h-full rounded-lg overflow-hidden">
                  <img
                    src={fleetItems[current].image || "/placeholder.svg"}
                    alt={fleetItems[current].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-slate-700 bg-slate-900/80 backdrop-blur-sm text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="flex justify-center mt-8">
        {fleetItems.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1 transition-all duration-300 ${
              index === current ? "bg-blue-500 w-8" : "bg-slate-700 hover:bg-slate-600"
            }`}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            aria-label={`Go to fleet item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

