import Link from "next/link"
import { Upload, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Same as main app for consistency */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="text-emerald-600">
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
              <span className="font-bold text-xl">ProjectJob</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
                Find Project
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
                Reports
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
                My Contracts
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
                Request Project
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Perfect <span className="text-emerald-600">Career Match</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl">
            Connect with top companies and freelance opportunities tailored to your skills and experience.
          </p>

          {/* Decorative elements */}
          <div className="relative w-full max-w-3xl mb-16">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-emerald-500/10 rounded-full"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full"></div>

            <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 md:p-12 flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                {/* First Option */}
                <div className="flex flex-col items-center text-center">
                  <div className="bg-emerald-100 p-4 rounded-full mb-4">
                    <Upload className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">Quick Match</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Upload your resume and let our AI match you with the perfect opportunities
                  </p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                    Drop your Resume to match with jobs
                  </Button>
                </div>

                {/* Second Option */}
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">Explore Opportunities</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Browse through thousands of jobs and projects from top companies
                  </p>
                  <Button className="bg-black hover:bg-gray-800 text-white w-full">
                    <Link href="/">Browse Jobs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
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
                  className="text-emerald-600"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Smart Matching</h3>
              <p className="text-gray-500 text-sm">
                Our AI-powered algorithm matches your skills with the perfect job opportunities
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
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
                  className="text-emerald-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Verified Projects</h3>
              <p className="text-gray-500 text-sm">
                All projects and companies are verified to ensure a safe and reliable experience
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
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
                  className="text-emerald-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Time-Saving</h3>
              <p className="text-gray-500 text-sm">
                Find the right job or project in minutes, not hours, with our streamlined platform
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="text-emerald-600">
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
              <span className="font-bold text-xl">ProjectJob</span>
            </div>

            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600">
                About Us
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600">
                How It Works
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600">
                Support
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ProjectJob. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

