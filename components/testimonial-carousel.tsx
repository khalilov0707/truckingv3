"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    text: "TruckingPro has been our go-to carrier for the past 5 years. Their reliability and professionalism are unmatched in the industry. Our shipments always arrive on time and in perfect condition.",
    author: "John Doe",
    position: "Logistics Manager, ABC Manufacturing",
    initials: "JD",
  },
  {
    text: "We've worked with several carriers over the years, but none have provided the level of service and attention to detail that TruckingPro offers. Their team is responsive, and their drivers are professional.",
    author: "Jane Smith",
    position: "Supply Chain Director, XYZ Retail",
    initials: "JS",
  },
  {
    text: "When we need time-sensitive deliveries, TruckingPro is our first call. Their expedited shipping service has saved us countless times when facing tight deadlines. Highly recommended!",
    author: "Robert Johnson",
    position: "Operations Manager, 123 Distribution",
    initials: "RJ",
  },
  {
    text: "The customer service at TruckingPro is exceptional. They're always available to answer questions and provide updates on our shipments. It's refreshing to work with a carrier that truly cares about their clients.",
    author: "Sarah Williams",
    position: "Procurement Manager, Global Enterprises",
    initials: "SW",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-75"></div>
      <div className="relative bg-slate-900 rounded-lg p-8 border border-slate-800">
        <div className="flex justify-between items-center mb-8">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-700 text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500"
              onClick={prev}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-700 text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500"
              onClick={next}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <div className="relative h-[200px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <p className="mb-6 text-lg italic text-slate-300">"{testimonials[current].text}"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-900/20">
                  <span className="font-bold text-white">{testimonials[current].initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonials[current].author}</p>
                  <p className="text-sm text-slate-400">{testimonials[current].position}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1 transition-all duration-300 ${
                index === current ? "bg-blue-500 w-8" : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => {
                setAutoplay(false)
                setCurrent(index)
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

