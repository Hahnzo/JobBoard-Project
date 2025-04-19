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
import SignUpModal from "@/components/sign-up-modal"
import SignInModal from "@/components/sign-in-modal"
import { useAuth } from "@/context/auth-context"

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
  const { user, isLoading, logout } = useAuth()
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
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  // State to track jobs from backend
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('http://localhost:3001/api/jobs')
        if (!res.ok) throw new Error('Failed to fetch jobs')
        const data = await res.json()
        setJobs(data.jobs || [])
      } catch (err: any) {
        setError(err.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // Find the selected project from jobs
  const selectedProject = jobs.find((project) => project.id === selectedProjectId) || jobs[0]

  // Filter jobs based on location and job type
  const filteredProjects = jobs.filter((project) => {
    const locationMatch =
      selectedLocation === "all" || (project.location && project.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    const jobTypeMatch =
      selectedJobType === "all" || (project.jobType || project.job_type || '').toLowerCase().includes(selectedJobType.toLowerCase())
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

  if (loading) {
    return <div className="text-center p-8">Loading jobs...</div>
  }
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>
  }

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
            {user ? (
              <div className="flex items-center gap-4">
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
                  <AvatarFallback>
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName[0]}${user.lastName[0]}`
                      : 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-white text-emerald-500 hover:bg-white hover:text-emerald-600 font-medium"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-emerald-500 hover:bg-white hover:text-emerald-600 font-medium"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => setShowSignUpModal(true)}
                >
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
        <div className="bg-white shadow-sm border-b sticky top-20 z-10">
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

        <main className="container mx-auto px-4 pt-6 pb-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/3">
              <ProjectListings
                projects={currentProjects}
                selectedProjectId={selectedProjectId}
                onSelectProject={setSelectedProjectId}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
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

      {/* Sign Up Modal */}
      <SignUpModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} />

      {/* Sign In Modal */}
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />

      {/* Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        onUploadComplete={handleResumeUploadComplete}
      />
    </div>
  )
}
