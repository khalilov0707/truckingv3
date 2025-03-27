"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

interface ModernCTAButtonProps {
  text: string
  onClick: () => void
  variant: "primary" | "secondary"
  icon?: "arrow" | "chevron"
  className?: string
}

export default function ModernCTAButton({ text, onClick, variant, icon, className = "" }: ModernCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-full px-6 py-3 font-medium transition-all duration-300
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
            : "bg-transparent backdrop-blur-sm border border-blue-400/30 text-blue-400"
        }
        ${className}
      `}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span>{text}</span>
        {icon === "arrow" && (
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        )}
        {icon === "chevron" && (
          <motion.div
            animate={{ y: isHovered ? 2 : 0 }}
            transition={{
              y: {
                duration: 0.2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              },
            }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        )}
      </div>

      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 bg-blue-500/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}

