"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Bookmark, Shield, ArrowLeft, Upload, Plus, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Job posting created successfully!")
      // Reset form or redirect
    }, 1500)
  }

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
              <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 bg-emerald-50">
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </Button>
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
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to main page
        </Button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <Tabs defaultValue="post-job" className="space-y-4">
          <TabsList>
            <TabsTrigger value="post-job">Post New Job</TabsTrigger>
            <TabsTrigger value="manage-jobs">Manage Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="post-job" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
                <CardDescription>
                  Fill out the form below to create a new job posting that will be displayed on the main page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="job-title" placeholder="e.g. UI/UX Designer" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" placeholder="e.g. Acme Inc." required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-type">Job Type</Label>
                        <Select defaultValue="full-time">
                          <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience-level">Experience Level</Label>
                        <Select defaultValue="mid-level">
                          <SelectTrigger id="experience-level">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry-level">Entry Level</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="mid-level">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="principal">Principal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g. Remote, New York, NY" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary-range">Salary Range</Label>
                        <Input id="salary-range" placeholder="e.g. $50K - $75K" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-logo">Company Logo</Label>
                        <div className="flex items-center gap-2">
                          <Input id="company-logo" type="file" accept="image/*" className="flex-1" />
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <Upload className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job-description">Job Description</Label>
                      <Textarea
                        id="job-description"
                        placeholder="Describe the job role, responsibilities, and requirements..."
                        rows={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Skills & Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          placeholder="Add a skill or tag"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddTag()
                            }
                          }}
                        />
                        <Button type="button" variant="outline" onClick={handleAddTag}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                      {isSubmitting ? "Posting..." : "Post Job"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage-jobs">
            <Card>
              <CardHeader>
                <CardTitle>Manage Job Postings</CardTitle>
                <CardDescription>View, edit, and manage all your active and closed job postings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample job listings */}
                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">UI/UX Designer for SaaS Platform</h3>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <span>Full-time</span>
                          <span>•</span>
                          <span>Posted 2 days ago</span>
                          <span>•</span>
                          <span className="text-emerald-600">12 applications</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Frontend Developer</h3>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <span>Contract</span>
                          <span>•</span>
                          <span>Posted 5 days ago</span>
                          <span>•</span>
                          <span className="text-emerald-600">8 applications</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Product Designer</h3>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <span>Full-time</span>
                          <span>•</span>
                          <span>Posted 1 week ago</span>
                          <span>•</span>
                          <span className="text-emerald-600">15 applications</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>Review and manage applications for your job postings.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">No applications to display at this time.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Manage your company profile and admin account settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Company Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name-settings">Company Name</Label>
                        <Input id="company-name-settings" defaultValue="Acme Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-website">Company Website</Label>
                        <Input id="company-website" defaultValue="https://acme.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-email">Contact Email</Label>
                        <Input id="company-email" defaultValue="jobs@acme.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-location">Location</Label>
                        <Input id="company-location" defaultValue="San Francisco, CA" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-name">Admin Name</Label>
                        <Input id="admin-name" defaultValue="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Admin Email</Label>
                        <Input id="admin-email" defaultValue="john@acme.com" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

