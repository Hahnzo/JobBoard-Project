import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, MapPin, Calendar, Building, ArrowLeft } from "lucide-react"

// This would typically come from a database
const jobDetails = {
  id: "1",
  title: "Motion Graphics Designer",
  company: "Adobe",
  location: "New York, NY",
  type: "Full-time",
  level: "Mid Level",
  salary: "$75K - $100K",
  posted: "2 hrs ago",
  logo: "/placeholder.svg?height=80&width=80",
  logoBackground: "#FF0000",
  description:
    "We're looking for an experienced Motion Graphics Designer to join our team. You'll be responsible for creating engaging animations and visual effects for our products and marketing materials.",
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
  responsibilities: [
    "Create engaging motion graphics and animations for digital platforms",
    "Collaborate with designers and marketing team to develop creative concepts",
    "Produce high-quality animations that align with brand guidelines",
    "Stay up-to-date with the latest animation techniques and trends",
    "Optimize animations for different platforms and devices",
  ],
  requirements: [
    "3+ years of experience in motion graphics design",
    "Proficiency in Adobe After Effects and Adobe Creative Suite",
    "Strong portfolio demonstrating motion graphics skills",
    "Understanding of animation principles and techniques",
    "Experience with 2D and 3D animation",
    "Excellent communication and teamwork skills",
  ],
  benefits: [
    "Competitive salary and equity options",
    "Health, dental, and vision insurance",
    "Flexible work hours and remote work options",
    "Professional development budget",
    "Regular team events and activities",
    "Modern office with standing desks and free snacks",
  ],
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            LevelUp
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Post a Job</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to jobs
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div
                className="h-16 w-16 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: jobDetails.logoBackground }}
              >
                <img
                  src={jobDetails.logo || "/placeholder.svg"}
                  alt={`${jobDetails.company} logo`}
                  className="h-10 w-10"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{jobDetails.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{jobDetails.company}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{jobDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Posted {jobDetails.posted}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{jobDetails.type}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="icon" className="rounded-full">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="rounded-full bg-pink-500 text-white px-3 py-1 text-xs font-medium">
                    {jobDetails.level}
                  </Badge>
                  <Badge className="rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 text-xs font-medium">
                    {jobDetails.salary}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Job Description</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{jobDetails.description}</p>

                  <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-1 mb-6 text-gray-600 dark:text-gray-400">
                    {jobDetails.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 mb-6 text-gray-600 dark:text-gray-400">
                    {jobDetails.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 mb-6 text-gray-600 dark:text-gray-400">
                    {jobDetails.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">About {jobDetails.company}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Adobe is the global leader in digital media and digital marketing solutions. Our creative, marketing
                    and document solutions empower everyone – from emerging artists to global brands – to bring digital
                    creations to life and deliver immersive, compelling experiences to the right person at the right
                    moment for the best results.
                  </p>
                  <Button variant="outline" className="text-sm">
                    Visit company website
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Apply for this position</h3>
                  <Button className="w-full bg-indigo-700 hover:bg-indigo-800 mb-3">Apply Now</Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    This application will be sent to the employer
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Job Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {jobDetails.tags.map((tag, index) => (
                      <span key={index} className="text-xs text-gray-600 dark:text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Similar Jobs</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">UI/UX Designer at Amazon</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Remote • Mid Level</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Product Designer at Airbnb</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Hybrid - Seattle, WA • Principal</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">UX Designer at Google</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Hybrid - Barcelona, Spain • Entry Level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
