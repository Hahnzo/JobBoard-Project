import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FreelancerProfile() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Jimmy Sullivan" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>

        <h2 className="font-medium text-lg">Jimmy Sullivan</h2>
        <p className="text-gray-500 text-sm">Product Designer</p>

        <Button variant="outline" className="mt-3 text-sm">
          Edit Profile
        </Button>
      </div>

      <div>
        <h3 className="font-medium text-sm mb-2">Availability</h3>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          <span className="text-sm text-emerald-600 font-medium">Available for work</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm mb-2">Connect & Amount</h3>
        <div className="space-y-1">
          <p className="text-sm text-emerald-600">18 Available Connects</p>
          <p className="text-sm">2 Submitted Proposal</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm mb-3">Skills and Expertise</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
            UI Designer
          </Badge>
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
            UX Designer
          </Badge>
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
            User Research
          </Badge>
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
            Animation
          </Badge>
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
            Product Design
          </Badge>
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
            Figma
          </Badge>
        </div>

        <Button variant="default" className="w-full bg-black hover:bg-gray-800 text-white">
          View Profile
        </Button>
      </div>
    </div>
  )
}

