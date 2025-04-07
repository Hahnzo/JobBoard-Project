"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Bookmark, Search, Upload, ArrowDown, Shield, MapPin, Briefcase } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ProjectListings from "@/components/project-listings"
import ProjectDetail from "@/components/project-detail"
import ResumeUploadModal from "@/components/resume-upload-modal"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import JobApplicationForm from "@/components/job-application-form"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Extended mock data for projects - more items for pagination
export const mockProjects = [
  {
    id: 1,
    title: "Looking for Figma Designer for Gaming Theme",
    description: "We are looking for a Figma designer for a 2 page design.",
    fullDescription: [
      "We are looking for a Figma designer for a 2 page design. If we are satisfied then more pages will follow. Also it will be a trial for a potential long term position.",
      "The theme of the project is gaming related so it would be of advantage if you have done gaming related designs before.",
      'We are not looking for a "Canva" designer so if you think you are good with Canva, please do not apply.',
      "We are looking for someone who brings in his/her designer knowledge and brings in own ideas.",
      "Start would be immediately.",
    ],
    company: "GameStudio",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#00C4B4",
    tags: ["UI Designer", "Figma", "Landing Page"],
    rating: 5,
    verified: true,
    proposals: "10 to 15",
    reviews: 48,
    successProjects: 28,
    totalSpent: "$60k+",
    paymentVerified: true,
    location: "Remote",
    jobType: "Contract",
  },
  {
    id: 2,
    title: "UI/UX designer for responsive SaaS platform",
    description: "Looking for a UI/UX designer to develop a responsive design for our SaaS platform.",
    fullDescription: [
      "Looking for a UI/UX designer to develop a responsive design for our SaaS platform.",
      "We need someone with experience in designing modern, clean interfaces for web applications.",
      "The project involves designing the main dashboard, user settings, and analytics pages.",
      "You should have a strong portfolio showcasing similar work and be proficient with Figma.",
      "This could turn into a long-term collaboration for the right candidate.",
    ],
    company: "Airbnb",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#FF5A5F",
    tags: ["Responsive", "Figma", "Mobile App Design"],
    rating: 5,
    verified: true,
    proposals: "10 to 15",
    reviews: 36,
    successProjects: 22,
    totalSpent: "$45k+",
    paymentVerified: true,
    location: "San Francisco, CA",
    jobType: "Full-time",
  },
  {
    id: 3,
    title: "Fav icon development. You provided one Fav icon",
    description: "You provided one Fav icon that we use as a reference.",
    fullDescription: [
      "You provided one Fav icon that we use as a reference.",
      "We need a set of favicon icons for our website in different sizes and formats.",
      "The icons should be consistent with our brand identity and work well on different browsers and devices.",
      "Please include .ico, .png, and SVG formats in your deliverables.",
      "Experience with icon design and knowledge of favicon best practices is required.",
    ],
    company: "Amazon",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#FF9900",
    tags: ["Icon design", "Figma", "balsamiq"],
    rating: 5,
    verified: true,
    proposals: "10 to 15",
    reviews: 52,
    successProjects: 31,
    totalSpent: "$75k+",
    paymentVerified: true,
    location: "Remote",
    jobType: "Freelance",
  },
  {
    id: 4,
    title: "Graphic designer to create icons",
    description: "We need a graphic designer to create a set of icons for our website.",
    fullDescription: [
      "We need a graphic designer to create a set of icons for our website.",
      "The project requires designing 20-25 custom icons that match our brand style and color palette.",
      "Icons should be delivered in SVG format and be optimized for web use.",
      "We're looking for a designer with experience in creating cohesive icon sets.",
      "Please share examples of icon work you've done in the past when applying.",
    ],
    company: "DesignCo",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#6C5CE7",
    tags: ["Graphic Design", "Icons", "Illustrator"],
    rating: 4,
    verified: true,
    proposals: "5 to 10",
    reviews: 24,
    successProjects: 18,
    totalSpent: "$30k+",
    paymentVerified: true,
    location: "New York, NY",
    jobType: "Part-time",
  },
  {
    id: 5,
    title: "Frontend Developer with React Experience",
    description: "Looking for a skilled frontend developer with React experience for our web application.",
    fullDescription: [
      "We are seeking a talented frontend developer with strong React experience to join our team.",
      "You will be responsible for building user interfaces for our web application using React, Redux, and modern CSS.",
      "The ideal candidate should have experience with responsive design and cross-browser compatibility.",
      "Knowledge of TypeScript and testing frameworks is a plus.",
      "This is a remote position with flexible working hours.",
    ],
    company: "TechCorp",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#3498db",
    tags: ["React", "Frontend", "JavaScript", "Redux"],
    rating: 5,
    verified: true,
    proposals: "15 to 20",
    reviews: 42,
    successProjects: 35,
    totalSpent: "$80k+",
    paymentVerified: true,
    location: "Remote",
    jobType: "Full-time",
  },
  {
    id: 6,
    title: "Mobile App Developer for iOS",
    description: "Experienced iOS developer needed for our health and fitness application.",
    fullDescription: [
      "We are looking for an experienced iOS developer to work on our health and fitness application.",
      "The developer will be responsible for maintaining and improving our existing iOS app.",
      "Strong knowledge of Swift, UIKit, and Core Data is required.",
      "Experience with HealthKit and integrating with wearable devices is a plus.",
      "This is a contract position with the possibility of extension.",
    ],
    company: "FitTech",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#27ae60",
    tags: ["iOS", "Swift", "Mobile", "HealthKit"],
    rating: 4,
    verified: true,
    proposals: "8 to 12",
    reviews: 31,
    successProjects: 24,
    totalSpent: "$65k+",
    paymentVerified: true,
    location: "Boston, MA",
    jobType: "Contract",
  },
  {
    id: 7,
    title: "Backend Developer with Node.js",
    description: "Looking for a backend developer with Node.js experience for our e-commerce platform.",
    fullDescription: [
      "We are seeking a backend developer with strong Node.js experience for our e-commerce platform.",
      "You will be responsible for developing and maintaining our API services and database architecture.",
      "Experience with Express.js, MongoDB, and RESTful API design is required.",
      "Knowledge of payment gateway integrations and security best practices is a plus.",
      "This is a full-time position with the option to work remotely.",
    ],
    company: "ShopWave",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#e74c3c",
    tags: ["Node.js", "Backend", "MongoDB", "API"],
    rating: 5,
    verified: true,
    proposals: "12 to 18",
    reviews: 39,
    successProjects: 32,
    totalSpent: "$75k+",
    paymentVerified: true,
    location: "Chicago, IL",
    jobType: "Full-time",
  },
  {
    id: 8,
    title: "UX Researcher for Product Testing",
    description: "UX researcher needed to conduct user testing and gather feedback for our product.",
    fullDescription: [
      "We are looking for a UX researcher to conduct user testing and gather feedback for our product.",
      "The researcher will be responsible for planning and executing user research studies.",
      "Experience with qualitative and quantitative research methods is required.",
      "Strong analytical skills and the ability to present findings clearly are essential.",
      "This is a part-time position with flexible hours.",
    ],
    company: "UserFirst",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#9b59b6",
    tags: ["UX Research", "User Testing", "Product Design"],
    rating: 4,
    verified: true,
    proposals: "5 to 10",
    reviews: 27,
    successProjects: 21,
    totalSpent: "$40k+",
    paymentVerified: true,
    location: "Seattle, WA",
    jobType: "Part-time",
  },
  {
    id: 9,
    title: "Full Stack Developer for Startup",
    description: "Full stack developer needed for an early-stage startup building a SaaS product.",
    fullDescription: [
      "We are an early-stage startup looking for a full stack developer to help build our SaaS product.",
      "You will be working closely with the founding team to develop and iterate on features.",
      "Experience with React, Node.js, and PostgreSQL is required.",
      "Familiarity with AWS or other cloud platforms is a plus.",
      "This is a full-time position with equity options.",
    ],
    company: "LaunchPad",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#f39c12",
    tags: ["Full Stack", "React", "Node.js", "Startup"],
    rating: 5,
    verified: true,
    proposals: "15 to 20",
    reviews: 18,
    successProjects: 15,
    totalSpent: "$55k+",
    paymentVerified: true,
    location: "Austin, TX",
    jobType: "Full-time",
  },
  {
    id: 10,
    title: "DevOps Engineer for Cloud Infrastructure",
    description: "DevOps engineer needed to manage and improve our cloud infrastructure.",
    fullDescription: [
      "We are looking for a DevOps engineer to manage and improve our cloud infrastructure.",
      "You will be responsible for CI/CD pipelines, infrastructure as code, and monitoring systems.",
      "Experience with AWS, Terraform, and Docker is required.",
      "Knowledge of Kubernetes and microservices architecture is a plus.",
      "This is a remote position with occasional on-site meetings.",
    ],
    company: "CloudTech",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#1abc9c",
    tags: ["DevOps", "AWS", "Terraform", "Docker"],
    rating: 5,
    verified: true,
    proposals: "10 to 15",
    reviews: 34,
    successProjects: 29,
    totalSpent: "$90k+",
    paymentVerified: true,
    location: "Remote",
    jobType: "Full-time",
  },
  {
    id: 11,
    title: "Content Writer for Tech Blog",
    description: "Experienced content writer needed for our technology blog and documentation.",
    fullDescription: [
      "We are seeking an experienced content writer for our technology blog and documentation.",
      "You will be responsible for creating engaging articles, tutorials, and technical documentation.",
      "Strong understanding of technology trends and the ability to explain complex concepts simply is required.",
      "Experience with SEO best practices and content management systems is a plus.",
      "This is a freelance position with ongoing work.",
    ],
    company: "TechBytes",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#34495e",
    tags: ["Content Writing", "Technical Writing", "SEO", "Blog"],
    rating: 4,
    verified: true,
    proposals: "8 to 12",
    reviews: 22,
    successProjects: 18,
    totalSpent: "$35k+",
    paymentVerified: true,
    location: "Remote",
    jobType: "Freelance",
  },
  {
    id: 12,
    title: "Data Scientist for Analytics Platform",
    description: "Data scientist needed to develop machine learning models for our analytics platform.",
    fullDescription: [
      "We are looking for a data scientist to develop machine learning models for our analytics platform.",
      "You will be responsible for data analysis, feature engineering, and model development.",
      "Experience with Python, pandas, scikit-learn, and TensorFlow is required.",
      "Knowledge of NLP and computer vision techniques is a plus.",
      "This is a full-time position with remote work options.",
    ],
    company: "DataInsight",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#2980b9",
    tags: ["Data Science", "Machine Learning", "Python", "TensorFlow"],
    rating: 5,
    verified: true,
    proposals: "12 to 18",
    reviews: 29,
    successProjects: 24,
    totalSpent: "$85k+",
    paymentVerified: true,
    location: "San Jose, CA",
    jobType: "Full-time",
  },
  {
    id: 13,
    title: "Product Manager for FinTech App",
    description: "Experienced product manager needed for our financial technology application.",
    fullDescription: [
      "We are seeking an experienced product manager for our financial technology application.",
      "You will be responsible for product strategy, roadmap planning, and feature prioritization.",
      "Experience in the financial services or banking industry is required.",
      "Strong understanding of user-centered design principles and agile methodologies is essential.",
      "This is a full-time position based in our New York office.",
    ],
    company: "FinanceFlow",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#16a085",
    tags: ["Product Management", "FinTech", "Agile", "Strategy"],
    rating: 5,
    verified: true,
    proposals: "10 to 15",
    reviews: 31,
    successProjects: 26,
    totalSpent: "$95k+",
    paymentVerified: true,
    location: "New York, NY",
    jobType: "Full-time",
  },
  {
    id: 14,
    title: "QA Engineer for Mobile Applications",
    description: "QA engineer needed to ensure the quality of our mobile applications.",
    fullDescription: [
      "We are looking for a QA engineer to ensure the quality of our mobile applications.",
      "You will be responsible for manual and automated testing of our iOS and Android apps.",
      "Experience with mobile testing frameworks and tools like Appium is required.",
      "Knowledge of CI/CD pipelines and test automation best practices is a plus.",
      "This is a contract position with the possibility of extension.",
    ],
    company: "AppQuality",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#d35400",
    tags: ["QA", "Mobile Testing", "Automation", "Appium"],
    rating: 4,
    verified: true,
    proposals: "6 to 10",
    reviews: 25,
    successProjects: 20,
    totalSpent: "$45k+",
    paymentVerified: true,
    location: "Portland, OR",
    jobType: "Contract",
  },
  {
    id: 15,
    title: "Blockchain Developer for NFT Platform",
    description: "Blockchain developer needed for our NFT marketplace platform.",
    fullDescription: [
      "We are seeking a blockchain developer for our NFT marketplace platform.",
      "You will be responsible for smart contract development and blockchain integration.",
      "Experience with Ethereum, Solidity, and Web3.js is required.",
      "Knowledge of NFT standards (ERC-721, ERC-1155) and marketplace mechanics is essential.",
      "This is a remote position with competitive compensation.",
    ],
    company: "NFTWorld",
    logo: "/placeholder.svg?height=40&width=40",
    logoBackground: "#8e44ad",
    tags: ["Blockchain", "Solidity", "NFT", "Ethereum"],
    rating: 5,
    verified: true,
    proposals: "15 to 20",
    reviews: 19,
    successProjects: 16,
    totalSpent: "$70k+",
    paymentVerified: true,
    location: "Remote",
    jobType: "Contract",
  },
]

// Available locations for the dropdown
const locations = [
  { value: "all", label: "All Locations" },
  { value: "remote", label: "Remote" },
  { value: "san-francisco", label: "San Francisco, CA" },
  { value: "new-york", label: "New York, NY" },
  { value: "boston", label: "Boston, MA" },
  { value: "chicago", label: "Chicago, IL" },
  { value: "seattle", label: "Seattle, WA" },
  { value: "austin", label: "Austin, TX" },
  { value: "portland", label: "Portland, OR" },
  { value: "san-jose", label: "San Jose, CA" },
]

// Available job types for the dropdown
const jobTypes = [
  { value: "all", label: "All Job Types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
]

export default function Home() {
  // State to track the selected project
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1)
  const [scrolled, setScrolled] = useState(false)
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [activeTab, setActiveTab] = useState("featured")
  const mainContentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedJobType, setSelectedJobType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 20

  // Find the selected project from the mock data
  const selectedProject = mockProjects.find((project) => project.id === selectedProjectId) || mockProjects[0]

  // Filter projects based on location and job type
  const filteredProjects = mockProjects.filter((project) => {
    const locationMatch =
      selectedLocation === "all" || project.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const jobTypeMatch =
      selectedJobType === "all" || project.jobType.toLowerCase().includes(selectedJobType.toLowerCase())
    return locationMatch && jobTypeMatch
  })

  // Get current projects for pagination
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  // Handle scroll to main content
  const scrollToMainContent = () => {
    mainContentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle resume upload
  const handleResumeUpload = () => {
    setShowResumeModal(true)
  }

  // Handle resume upload completion
  const handleResumeUploadComplete = () => {
    setResumeUploaded(true)
    setShowResumeModal(false)
  }

  // Navigate to admin page
  const navigateToAdmin = () => {
    router.push("/admin")
  }

  // Handle job application
  const handleApplyForJob = () => {
    setShowApplicationForm(true)
  }

  // Handle application form close
  const handleCloseApplicationForm = () => {
    setShowApplicationForm(false)
  }

  // Track scroll position for header changes
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      if (position > window.innerHeight * 0.5) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Fixed header that changes on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className={`${scrolled ? "text-emerald-600" : "text-emerald-500"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L14.2451 7.96393L20.5106 7.90983L15.2298 11.7361L17.5106 17.6803L12 14.1L6.48944 17.6803L8.77022 11.7361L3.48944 7.90983L9.75486 7.96393L12 2Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className={`font-bold text-xl ${scrolled ? "text-gray-900" : "text-white"}`}>ProjectJob</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className={`text-sm font-medium ${scrolled ? "text-gray-700 hover:text-emerald-600" : "text-white/80 hover:text-white"}`}
              >
                Find Opportunities
              </a>
              <Button
                variant={scrolled ? "outline" : "ghost"}
                size="sm"
                className={scrolled ? "border-gray-300" : "border-white/30 text-white hover:bg-white/10"}
                onClick={navigateToAdmin}
              >
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {scrolled ? (
              <>
                <button className="text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Bookmark className="h-5 w-5" />
                </button>
                <div className="relative">
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  Sign In
                </Button>
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Landing Page Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-black z-0"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 z-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Find Your Perfect <span className="text-emerald-400">Career Match</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl">
              Connect with top companies and freelance opportunities tailored to your skills and experience.
            </p>

            {/* Main options - KEEPING THE ORIGINAL RESUME UPLOAD SECTION */}
            <div className="w-full max-w-3xl mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 md:p-12 flex flex-col items-center border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                  {/* First Option - Resume Upload */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-emerald-400/20 p-4 rounded-full mb-4">
                      <Upload className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-3 text-white">Quick Match</h3>
                    <p className="text-white/70 text-sm mb-6">
                      Upload your resume and let our AI match you with the perfect opportunities
                    </p>
                    <Button
                      className="bg-emerald-500 hover:bg-emerald-600 text-white w-full"
                      onClick={handleResumeUpload}
                    >
                      Drop your Resume to match with jobs
                    </Button>
                  </div>

                  {/* Second Option - Browse Jobs */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white/20 p-4 rounded-full mb-4">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-medium mb-3 text-white">Explore Opportunities</h3>
                    <p className="text-white/70 text-sm mb-6">
                      Browse through thousands of jobs and projects from top companies
                    </p>
                    <Button
                      className="bg-white hover:bg-gray-100 text-emerald-800 w-full"
                      onClick={scrollToMainContent}
                    >
                      Browse Jobs
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <button
                onClick={scrollToMainContent}
                className="flex flex-col items-center text-white/80 hover:text-white"
                aria-label="Scroll to browse jobs"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <ArrowDown className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div ref={mainContentRef} className="min-h-screen bg-gray-100 pt-20">
        {/* Horizontal Filter Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                <Button
                  variant={activeTab === "featured" ? "default" : "ghost"}
                  className={
                    activeTab === "featured" ? "bg-black hover:bg-gray-800 text-white rounded-md" : "text-gray-600"
                  }
                  onClick={() => setActiveTab("featured")}
                >
                  Featured
                </Button>
                <Button
                  variant={activeTab === "recent" ? "default" : "ghost"}
                  className={
                    activeTab === "recent" ? "bg-black hover:bg-gray-800 text-white rounded-md" : "text-gray-600"
                  }
                  onClick={() => setActiveTab("recent")}
                >
                  Most Recent
                </Button>
              </div>

              <div className="flex-1 px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for skills, job titles, or keywords..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Job Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((jobType) => (
                      <SelectItem key={jobType.value} value={jobType.value}>
                        {jobType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon" className="bg-black text-white rounded-md h-9 w-9">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/3 space-y-6">
              <ProjectListings
                projects={currentProjects}
                selectedProjectId={selectedProjectId}
                onSelectProject={setSelectedProjectId}
              />

              {/* Pagination */}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="w-full lg:w-2/3 space-y-6">
              <ProjectDetail project={selectedProject} onApplyClick={handleApplyForJob} />
            </div>
          </div>
        </main>
      </div>

      {/* Job Application Form Modal */}
      {showApplicationForm && (
        <JobApplicationForm
          isOpen={showApplicationForm}
          onClose={handleCloseApplicationForm}
          jobTitle={selectedProject.title}
          companyName={selectedProject.company}
        />
      )}

      {/* Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        onUploadComplete={handleResumeUploadComplete}
      />
    </div>
  )
}

