"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  colorClass: string
  index: number
}

export default function ServiceCard({ title, description, icon: Icon, colorClass, index }: ServiceCardProps) {
  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
      <div className="relative bg-slate-900 rounded-lg p-6 h-full border border-slate-800 transition-colors duration-300">
        <div
          className={`h-12 w-12 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20 transition-transform duration-300`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white transition-colors duration-300">{title}</h3>
        <p className="text-slate-400">{description}</p>
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
          <span>Service Information</span>
        </div>
      </div>
    </motion.div>
  )
}

