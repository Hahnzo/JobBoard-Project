"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for job listings
const mockJobs = [
  {
    id: 1,
    title: "Motion Graphics Designer",
    company: "Adobe",
    logo: "/placeholder.svg?height=50&width=50",
    logoBackground: "#FF0000",
    posted: "2 hrs ago",
    status: "Posted",
    level: "Mid Level",
    salary: "$75K - $100K",
    location: "New York, NY",
    tags: [
      "#AD",
      "#Credit",
      "#HealthInsurance",
      "#Service",
      "#HappyHours",
      "#SalaryPerYear",
      "#SickLeave",
      "#Flexibility",
      "#Vegan",
      "#VegetarianFood",
      "#HealthyFoodOptions",
    ],
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Airbnb",
    logo: "/placeholder.svg?height=50&width=50",
    logoBackground: "#FF5A5F",
    posted: "1 hrs ago",
    status: "Update",
    level: "Sr Level",
    salary: "$75K - $100K",
    location: "Hybrid - Barcelona, Spain",
    tags: [
      "#HealthInsurance",
      "#PrivateHealthInsurance",
      "#DentalVisionCare",
      "#Service",
      "#HappyHours",
      "#FlexiVac",
      "#PetFriendly",
      "#Vegetarian",
      "#HealthyFoodOptions",
    ],
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Google",
    logo: "/placeholder.svg?height=50&width=50",
    logoBackground: "#4285F4",
    posted: "2 days ago",
    status: "Update",
    level: "Entry Level",
    salary: "$50K - $75K",
    location: "Hybrid - Barcelona, Spain",
    tags: [
      "#HealthInsurance",
      "#PrivateHealthInsurance",
      "#DentalVisionCare",
      "#Service",
      "#HappyHours",
      "#FlexiView",
      "#PetFriendly",
      "#Vegan",
      "#Vegetarian",
      "#HealthyFoodOptions",
    ],
  },
  {
    id: 4,
    title: "Product Designer",
    company: "Airbnb",
    logo: "/placeholder.svg?height=50&width=50",
    logoBackground: "#FF5A5F",
    posted: "3 hrs ago",
    status: "Posted",
    level: "Principal",
    salary: "$150K - $200K",
    location: "Hybrid - Seattle, WA",
    tags: [
      "#HealthInsurance",
      "#FlexibleOffDays",
      "#PaidTimeOff",
      "#FoodCard",
      "#On-SiteTeamEvents",
      "#GymMembershipDiscounts",
      "#FreeSnacksAndBeverages",
    ],
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "Shopify",
    logo: "/placeholder.svg?height=50&width=50",
    logoBackground: "#7AB55C",
    posted: "2 days ago",
    status: "Update",
    level: "Junior",
    salary: "$50K - $75K",
    location: "Hybrid - San Francisco, CA",
    tags: [
      "#HealthInsurance",
      "#DentalVisionCare",
      "#Service",
      "#HappyHours",
      "#FlexiView",
      "#PetFriendly",
      "#Vegan",
      "#Vegetarian",
      "#HealthyFoodOptions",
    ],
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "Amazon",
    logo: "/placeholder.svg?height=50&width=50",
    logoBackground: "#FF9900",
    posted: "2 days ago",
    status: "Posted",
    level: "Mid Level",
    salary: "$90K - $120K",
    location: "Remote",
    tags: [
      "#HealthInsurance",
      "#DentalVisionCare",
      "#RemoteSupport",
      "#PrivateHealthInsurance",
      "#FlexibleWorkingHours",
      "#WellnessSupport",
      "#VirtualTeamActivities",
    ],
  },
]

export default function JobListings() {
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const toggleSaveJob = (id: number) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id))
    } else {
      setSavedJobs([...savedJobs, id])
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Entry Level":
        return "bg-teal-500 text-white"
      case "Junior":
        return "bg-orange-400 text-white"
      case "Mid Level":
        return "bg-pink-500 text-white"
      case "Sr Level":
        return "bg-green-500 text-white"
      case "Principal":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockJobs.map((job) => (
        <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs text-gray-500">
                <span className="font-medium">{job.status}</span> · {job.posted}
              </div>
              <button
                onClick={() => toggleSaveJob(job.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Bookmark className="h-5 w-5" fill={savedJobs.includes(job.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex gap-4">
              <div
                className="h-12 w-12 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: job.logoBackground }}
              >
                <img src={job.logo || "/placeholder.svg"} alt={`${job.company} logo`} className="h-8 w-8" />
              </div>

              <div>
                <h3 className="font-medium text-lg">{job.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{job.company}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className={`rounded-full px-3 py-1 text-xs font-medium ${getLevelColor(job.level)}`}>
                {job.level}
              </Badge>
              <Badge className="rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 text-xs font-medium">
                {job.salary}
              </Badge>
              <Badge className="rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 text-xs font-medium">
                {job.location}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.tags.slice(0, 8).map((tag, index) => (
                <span key={index} className="text-xs text-gray-500 dark:text-gray-400">
                  {tag}
                </span>
              ))}
              {job.tags.length > 8 && <span className="text-xs text-gray-500 dark:text-gray-400">...</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
