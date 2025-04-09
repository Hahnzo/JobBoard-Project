import Link from "next/link"
import { Bell, Bookmark, Check, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This would typically come from a database
const projectDetails = {
  id: "1",
  title: "Looking for Figma Designer for GAMING THEME",
  description:
    "We are looking for a Figma designer for a 2 page design. If we are satisfied then more pages will follow. Also it will be a trial for a potential long term position.",
  client: "GameStudio",
  clientLogo: "/placeholder.svg?height=80&width=80",
  logoBackground: "#00C4B4",
  posted: "2 days ago",
  budget: "$500 - $1,000",
  duration: "Less than 1 month",
  expertise: ["UI Designer", "Figma", "Landing Page", "Gaming", "Web Design"],
  rating: 5,
  reviews: 48,
  successProjects: 28,
  totalSpent: "$60k+",
  projectVerified: true,
  paymentVerified: true,
  overview: [
    "We are looking for a Figma designer for a 2 page design. If we are satisfied then more pages will follow. Also it will be a trial for a potential long term position.",
    "The theme of the project is gaming related so it would be of advantage if you have done gaming related designs before.",
    'We are not looking for a "Canva" designer so if you think you are good with Canva, please do not apply.',
    "We are looking for someone who brings in his/her designer knowledge and brings in own ideas.",
    "Start would be immediately.",
  ],
  requirements: [
    "At least 2 years of experience with Figma",
    "Portfolio showcasing gaming-related designs",
    "Strong understanding of UI/UX principles",
    "Ability to work independently and bring creative ideas",
    "Good communication skills in English",
  ],
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
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
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Bookmark className="h-5 w-5" />
            </button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div
                    className="h-16 w-16 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: projectDetails.logoBackground }}
                  >
                    <img
                      src={projectDetails.clientLogo || "/placeholder.svg"}
                      alt={`${projectDetails.client} logo`}
                      className="h-10 w-10"
                    />
                  </div>

                  <div>
                    <h1 className="text-xl font-medium mb-1">{projectDetails.title}</h1>
                    <p className="text-gray-500 text-sm">{projectDetails.client}</p>
                    <p className="text-gray-500 text-xs mt-1">Posted {projectDetails.posted}</p>
                  </div>
                </div>

                <Button variant="outline" size="icon" className="rounded-full">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-700 mb-3">Project Overview</h2>
                {projectDetails.overview.map((paragraph, index) => (
                  <p key={index} className="text-sm text-gray-600 mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-700 mb-3">Requirements</h2>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {projectDetails.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-700 mb-3">Skills and Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {projectDetails.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    {projectDetails.rating.toFixed(2)} of {projectDetails.reviews} reviews
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < projectDetails.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{projectDetails.successProjects} success project</div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="bg-blue-500 text-white rounded-full p-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Project Verified</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{projectDetails.totalSpent} total spent</div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="bg-blue-500 text-white rounded-full p-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Payment Verified</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Submit a Proposal</Button>
                </div>
                <div className="flex-1">
                  <Button variant="outline" className="w-full">
                    Save Project
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Client History</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Member since</p>
                    <p className="text-gray-500 text-sm">March 2022</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">Total projects</p>
                    <p className="text-gray-500 text-sm">32</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Average hourly rate paid</p>
                    <p className="text-gray-500 text-sm">$45/hr</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">Total hours</p>
                    <p className="text-gray-500 text-sm">1,240</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Project Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{projectDetails.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{projectDetails.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Project Type</p>
                  <p className="font-medium">One-time project</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience Level</p>
                  <p className="font-medium">Intermediate</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Similar Projects</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm">UI/UX Designer for Mobile App</h3>
                  <p className="text-xs text-gray-500">$800 - $1,500 • Posted 1 day ago</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Figma Designer for E-commerce Website</h3>
                  <p className="text-xs text-gray-500">$500 - $1,000 • Posted 3 days ago</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">UI Designer for Dashboard Redesign</h3>
                  <p className="text-xs text-gray-500">$300 - $600 • Posted 5 days ago</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 text-sm">
                Browse More Projects
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
