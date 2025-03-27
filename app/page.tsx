"use client"

import { useEffect, useRef, useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Truck,
  Clock,
  Shield,
  ChevronRight,
  Menu,
  X,
  BarChart,
  Users,
  Award,
  TrendingUp,
  Zap,
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CountUp from "@/components/count-up"
import ServiceCard from "@/components/service-card"
import TestimonialCarousel from "@/components/testimonial-carousel"
import FleetShowcase from "@/components/fleet-showcase"
import PartnersSlider from "@/components/partners-slider"
import { ThemeToggle } from "@/components/theme-toggle"
import { scrollToSection } from "@/utils/scroll-utils"
import ModernCTAButton from "@/components/modern-cta-button"
import "./partners-slider.css"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["home", "services", "about", "partners", "fleet", "testimonials", "contact"]

      // Get header height for offset calculation
      const header = document.querySelector("header")
      const headerHeight = header ? header.getBoundingClientRect().height : 0

      // Find the section that is currently in view
      let currentSection = sections[0]
      let minDistance = Number.POSITIVE_INFINITY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const distance = Math.abs(rect.top - headerHeight)

          // If this section is closer to the top of the viewport than the previous closest
          if (distance < minDistance) {
            minDistance = distance
            currentSection = section
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const stats = [
    { value: 15, label: "Years Experience", icon: Award },
    { value: 500, label: "Clients Served", icon: Users },
    { value: 48, label: "States Covered", icon: MapPin },
    { value: 5000, label: "Deliveries Monthly", icon: TrendingUp },
  ]

  const services = [
    {
      title: "Full Truckload",
      description: "Dedicated trucks for your shipments with direct delivery from origin to destination.",
      icon: Truck,
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "Expedited Shipping",
      description: "Time-critical deliveries with priority handling and real-time tracking.",
      icon: Zap,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      title: "Specialized Freight",
      description: "Safe transportation of oversized, heavy, or sensitive cargo requiring special handling.",
      icon: Shield,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      title: "Refrigerated Transport",
      description: "Temperature-controlled trailers for perishable goods and sensitive products.",
      icon: Clock,
      color: "from-sky-600 to-sky-400",
    },
    {
      title: "Flatbed Services",
      description: "Open trailers for oversized or irregularly shaped cargo requiring side loading.",
      icon: BarChart,
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "Logistics Solutions",
      description: "End-to-end logistics management with real-time tracking and reporting.",
      icon: TrendingUp,
      color: "from-indigo-600 to-indigo-400",
    },
  ]

  const isLight = mounted && resolvedTheme === "light"

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? isLight
              ? "bg-blue-900/90 backdrop-blur-md shadow-lg py-2 text-white"
              : "bg-secondary/90 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4",
        )}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              TruckingPro
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {["home", "services", "about", "partners", "fleet", "testimonials", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-blue-400 relative py-2",
                  activeSection === section
                    ? "text-blue-400"
                    : isLight && !scrolled
                      ? "text-gray-800"
                      : "text-slate-100",
                )}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full"
                    layoutId="activeSection"
                  />
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <ModernCTAButton
                text="Get a Quote"
                onClick={() => scrollToSection("contact")}
                variant="primary"
                icon="arrow"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className={`lg:hidden ${
                isLight
                  ? "border-gray-300 text-gray-800 hover:bg-blue-50"
                  : "border-slate-700 text-slate-100 hover:bg-slate-800 hover:text-blue-400"
              }`}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`flex justify-between items-center p-4 border-b ${isLight ? "border-gray-200" : "border-slate-800"}`}
            >
              <div className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  TruckingPro
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  className={
                    isLight
                      ? "border-gray-300 text-gray-800 hover:bg-blue-50"
                      : "border-slate-700 text-slate-100 hover:bg-slate-800 hover:text-blue-400"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {["home", "services", "about", "partners", "fleet", "testimonials", "contact"].map((section) => (
                  <li key={section}>
                    <button
                      className={`flex items-center py-2 text-lg font-medium hover:text-blue-400 w-full text-left ${
                        isLight ? "text-gray-800" : ""
                      }`}
                      onClick={() => {
                        scrollToSection(section)
                        setIsMenuOpen(false)
                      }}
                    >
                      <ChevronRight className="mr-2 h-5 w-5 text-blue-400" />
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className={`absolute inset-0 ${isLight ? "bg-gradient-to-b from-white/90 to-gray-100/90" : "bg-gradient-to-b from-slate-900/90 to-slate-950/90"} z-10`}
          />
          <video autoPlay muted loop playsInline className="absolute w-full h-full object-cover">
            <source src="https://v0.blob.com/Ym9Ub3JlbWVtYmVyLm1wNA==" type="video/mp4" />
          </video>
          <motion.div
            className="container relative z-20 text-center"
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Next-Gen Trucking Solutions
            </motion.h1>
            <motion.p
              className={`mt-6 max-w-2xl mx-auto text-lg ${isLight ? "text-gray-700" : "text-slate-300"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Professional carrier services with nationwide coverage. On-time delivery, competitive rates, and
              exceptional customer service.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ModernCTAButton
                text="Request a Quote"
                onClick={() => scrollToSection("contact")}
                variant="primary"
                icon="arrow"
                className="w-full sm:w-auto"
              />
              <ModernCTAButton
                text="Explore Services"
                onClick={() => scrollToSection("services")}
                variant="secondary"
                icon="chevron"
                className="w-full sm:w-auto"
              />
            </motion.div>
          </motion.div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-blue-400 flex justify-center p-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`py-16 ${isLight ? "bg-blue-900 text-white" : "bg-secondary"}`}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    <CountUp end={stat.value} duration={2} />
                    {stat.value === 48 ? "" : "+"}
                  </div>
                  <div className={isLight ? "text-blue-100" : "text-slate-400"}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`py-24 ${isLight ? "bg-white" : "bg-slate-950"} relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyan-600 rounded-full filter blur-[150px]" />
          </div>
          <div className="container relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Services
              </h2>
              <p className={`mt-4 text-lg ${isLight ? "text-gray-600" : "text-slate-400"} max-w-2xl mx-auto`}>
                We offer comprehensive trucking and logistics solutions tailored to your business needs.
              </p>
              <div className="mt-6">
                <ModernCTAButton
                  text="Request a Custom Quote"
                  onClick={() => scrollToSection("contact")}
                  variant="primary"
                  icon="arrow"
                />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  colorClass={service.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-24 ${isLight ? "bg-blue-900" : "bg-secondary"} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-[150px] opacity-10" />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  About TruckingPro
                </h2>
                <p className={`text-lg mb-4 ${isLight ? "text-blue-100" : "text-slate-300"}`}>
                  With over 15 years of experience in the transportation industry, TruckingPro has established itself as
                  a trusted partner for businesses across the United States.
                </p>
                <p className={`text-lg mb-4 ${isLight ? "text-blue-100" : "text-slate-300"}`}>
                  Our commitment to reliability, safety, and customer satisfaction has made us the preferred carrier for
                  companies of all sizes, from small businesses to Fortune 500 corporations.
                </p>
                <p className={`text-lg mb-6 ${isLight ? "text-blue-100" : "text-slate-300"}`}>
                  We maintain a modern fleet of vehicles, employ skilled drivers, and leverage cutting-edge technology
                  to ensure your cargo reaches its destination safely and on time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ModernCTAButton
                    text="Contact Us"
                    onClick={() => scrollToSection("contact")}
                    variant="primary"
                    icon="arrow"
                  />
                  <ModernCTAButton
                    text="View Our Fleet"
                    onClick={() => scrollToSection("fleet")}
                    variant="secondary"
                    icon="chevron"
                  />
                </div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-75"></div>
                <div
                  className={`relative rounded-lg overflow-hidden shadow-2xl ${isLight ? "border border-blue-700" : "border border-slate-700"}`}
                >
                  <img
                    src="/placeholder.svg?height=500&width=600"
                    alt="Trucking company team"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg shadow-xl flex items-center justify-center">
                  <Award className="h-12 w-12 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className={`py-24 ${isLight ? "bg-white" : "bg-slate-950"} relative overflow-hidden`}>
          <div className="container relative z-10">
            <PartnersSlider />
          </div>
        </section>

        {/* Fleet Section */}
        <section id="fleet" className={`py-24 ${isLight ? "bg-blue-900" : "bg-secondary"} relative overflow-hidden`}>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-600 rounded-full filter blur-[150px] opacity-10" />
          <div className="container relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Fleet
              </h2>
              <p className={`mt-4 text-lg ${isLight ? "text-blue-100" : "text-slate-400"} max-w-2xl mx-auto`}>
                We maintain a modern, well-maintained fleet to handle all your transportation needs.
              </p>
            </motion.div>

            <FleetShowcase />
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className={`py-24 ${isLight ? "bg-white" : "bg-slate-950"} relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-[150px] opacity-10" />
          <div className="container relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                What Our Clients Say
              </h2>
              <p className={`mt-4 text-lg ${isLight ? "text-gray-600" : "text-slate-400"} max-w-2xl mx-auto`}>
                Don't just take our word for it. Here's what our clients have to say about our services.
              </p>
            </motion.div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-24 ${isLight ? "bg-blue-900" : "bg-secondary"} relative overflow-hidden`}>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-600 rounded-full filter blur-[150px] opacity-10" />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Contact Us
                </h2>
                <p className={`text-lg mb-8 ${isLight ? "text-blue-100" : "text-slate-300"}`}>
                  Ready to discuss your transportation needs? Fill out the form or contact us directly using the
                  information below.
                </p>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-900/20">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium ${isLight ? "text-white" : "text-white"}`}>Phone</p>
                      <p className={isLight ? "text-blue-100" : "text-slate-400"}>(555) 123-4567</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-900/20">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium ${isLight ? "text-white" : "text-white"}`}>Email</p>
                      <p className={isLight ? "text-blue-100" : "text-slate-400"}>info@truckingpro.com</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-900/20">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium ${isLight ? "text-white" : "text-white"}`}>Address</p>
                      <p className={isLight ? "text-blue-100" : "text-slate-400"}>
                        123 Logistics Way
                        <br />
                        Trucking City, TX 75001
                        <br />
                        United States
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-75"></div>
                  <div
                    className={`relative ${isLight ? "bg-white" : "bg-slate-900"} rounded-lg shadow-md p-6 ${isLight ? "border border-gray-200" : "border border-slate-800"}`}
                  >
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="first-name"
                            className={`text-sm font-medium ${isLight ? "text-gray-700" : "text-slate-300"}`}
                          >
                            First Name
                          </label>
                          <input
                            id="first-name"
                            className={`flex h-10 w-full rounded-md border ${isLight ? "border-gray-300 bg-gray-50 text-gray-900" : "border-slate-700 bg-slate-800/50 text-slate-100"} px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ${isLight ? "placeholder:text-gray-400" : "placeholder:text-slate-500"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="last-name"
                            className={`text-sm font-medium ${isLight ? "text-gray-700" : "text-slate-300"}`}
                          >
                            Last Name
                          </label>
                          <input
                            id="last-name"
                            className={`flex h-10 w-full rounded-md border ${isLight ? "border-gray-300 bg-gray-50 text-gray-900" : "border-slate-700 bg-slate-800/50 text-slate-100"} px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ${isLight ? "placeholder:text-gray-400" : "placeholder:text-slate-500"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="company"
                          className={`text-sm font-medium ${isLight ? "text-gray-700" : "text-slate-300"}`}
                        >
                          Company
                        </label>
                        <input
                          id="company"
                          className={`flex h-10 w-full rounded-md border ${isLight ? "border-gray-300 bg-gray-50 text-gray-900" : "border-slate-700 bg-slate-800/50 text-slate-100"} px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ${isLight ? "placeholder:text-gray-400" : "placeholder:text-slate-500"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          placeholder="Your Company"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className={`text-sm font-medium ${isLight ? "text-gray-700" : "text-slate-300"}`}
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={`flex h-10 w-full rounded-md border ${isLight ? "border-gray-300 bg-gray-50 text-gray-900" : "border-slate-700 bg-slate-800/50 text-slate-100"} px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ${isLight ? "placeholder:text-gray-400" : "placeholder:text-slate-500"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className={`text-sm font-medium ${isLight ? "text-gray-700" : "text-slate-300"}`}
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className={`flex h-10 w-full rounded-md border ${isLight ? "border-gray-300 bg-gray-50 text-gray-900" : "border-slate-700 bg-slate-800/50 text-slate-100"} px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ${isLight ? "placeholder:text-gray-400" : "placeholder:text-slate-500"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className={`text-sm font-medium ${isLight ? "text-gray-700" : "text-slate-300"}`}
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          className={`flex min-h-[120px] w-full rounded-md border ${isLight ? "border-gray-300 bg-gray-50 text-gray-900" : "border-slate-700 bg-slate-800/50 text-slate-100"} px-3 py-2 text-sm ring-offset-background ${isLight ? "placeholder:text-gray-400" : "placeholder:text-slate-500"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          placeholder="Tell us about your transportation needs..."
                        />
                      </div>
                      <ModernCTAButton text="Submit Request" onClick={() => {}} variant="primary" className="w-full" />
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`${isLight ? "bg-white" : "bg-slate-950"} py-12 border-t ${isLight ? "border-gray-200" : "border-border"}`}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  TruckingPro
                </span>
              </div>
              <p className={isLight ? "text-gray-600 mb-4" : "text-slate-400 mb-4"}>
                Professional trucking and logistics solutions for businesses across the United States.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className={`w-10 h-10 rounded-full ${isLight ? "bg-gray-100" : "bg-slate-800"} flex items-center justify-center ${isLight ? "text-gray-600" : "text-slate-400"} hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className={`w-10 h-10 rounded-full ${isLight ? "bg-gray-100" : "bg-slate-800"} flex items-center justify-center ${isLight ? "text-gray-600" : "text-slate-400"} hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className={`w-10 h-10 rounded-full ${isLight ? "bg-gray-100" : "bg-slate-800"} flex items-center justify-center ${isLight ? "text-gray-600" : "text-slate-400"} hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className={`font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className={`${isLight ? "text-gray-600" : "text-slate-400"} hover:text-blue-400 transition-colors duration-300 text-left`}
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className={`${isLight ? "text-gray-600" : "text-slate-400"} hover:text-blue-400 transition-colors duration-300 text-left`}
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("partners")}
                    className={`${isLight ? "text-gray-600" : "text-slate-400"} hover:text-blue-400 transition-colors duration-300 text-left`}
                  >
                    Our Partners
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("fleet")}
                    className={`${isLight ? "text-gray-600" : "text-slate-400"} hover:text-blue-400 transition-colors duration-300 text-left`}
                  >
                    Our Fleet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className={`${isLight ? "text-gray-600" : "text-slate-400"} hover:text-blue-400 transition-colors duration-300 text-left`}
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`${isLight ? "text-gray-600" : "text-slate-400"} hover:text-blue-400 transition-colors duration-300 text-left`}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>Services</h3>
              <ul className="space-y-2">
                <li>
                  <span className={`${isLight ? "text-gray-600" : "text-slate-400"} block`}>Full Truckload</span>
                </li>
                <li>
                  <span className={`${isLight ? "text-gray-600" : "text-slate-400"} block`}>Expedited Shipping</span>
                </li>
                <li>
                  <span className={`${isLight ? "text-gray-600" : "text-slate-400"} block`}>Specialized Freight</span>
                </li>
                <li>
                  <span className={`${isLight ? "text-gray-600" : "text-slate-400"} block`}>
                    Refrigerated Transport
                  </span>
                </li>
                <li>
                  <span className={`${isLight ? "text-gray-600" : "text-slate-400"} block`}>Flatbed Services</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
                  <span className={isLight ? "text-gray-600" : "text-slate-400"}>(555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
                  <span className={isLight ? "text-gray-600" : "text-slate-400"}>info@truckingpro.com</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
                  <span className={isLight ? "text-gray-600" : "text-slate-400"}>
                    123 Logistics Way
                    <br />
                    Trucking City, TX 75001
                    <br />
                    United States
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`border-t ${isLight ? "border-gray-200" : "border-slate-800"} mt-8 pt-8 text-center text-sm ${isLight ? "text-gray-500" : "text-slate-500"}`}
          >
            <p>&copy; {new Date().getFullYear()} TruckingPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

