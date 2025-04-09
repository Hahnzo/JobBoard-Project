"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building, Briefcase, MapPin, Calendar, Trash2, Plus, Upload } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">JobBoard</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">Browse Jobs</Link>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 space-y-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="font-bold text-lg">John Doe</h2>
                <p className="text-sm text-muted-foreground mb-2">Frontend Developer</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  San Francisco, CA
                </p>
              </CardContent>
            </Card>

            <div className="space-y-1">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </Button>
              <Button
                variant={activeTab === "resume" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("resume")}
              >
                Resume
              </Button>
              <Button
                variant={activeTab === "applications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </Button>
              <Button
                variant={activeTab === "saved" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("saved")}
              >
                Saved Jobs
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </Button>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and how it appears on your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="San Francisco, CA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue="https://johndoe.com" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Professional Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input id="title" defaultValue="Frontend Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue="Experienced frontend developer with 5+ years of experience building responsive web applications using React, TypeScript, and modern CSS frameworks."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          React
                          <button className="ml-1 hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          TypeScript
                          <button className="ml-1 hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Tailwind CSS
                          <button className="ml-1 hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          JavaScript
                          <button className="ml-1 hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          HTML/CSS
                          <button className="ml-1 hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Add a skill" />
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Work Experience</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Senior Frontend Developer</h4>
                              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  TechCorp Inc.
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Jan 2020 - Present
                                </span>
                              </div>
                              <p className="text-sm mt-2">
                                Led frontend development for multiple projects, mentored junior developers, and
                                implemented best practices.
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Frontend Developer</h4>
                              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  WebSolutions
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Mar 2017 - Dec 2019
                                </span>
                              </div>
                              <p className="text-sm mt-2">
                                Developed responsive web applications using React and Redux, collaborated with designers
                                and backend developers.
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Work Experience
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Education</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  University of Technology
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  2013 - 2017
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "resume" && (
              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>Upload and manage your resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="mx-auto flex flex-col items-center justify-center gap-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <h3 className="font-medium">Upload your resume</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your resume file here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, DOC (Max 5MB)</p>
                      <Button variant="outline" className="mt-2">
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Uploaded Resumes</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted p-2 rounded">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">John_Doe_Resume.pdf</h4>
                              <p className="text-xs text-muted-foreground">Uploaded on May 15, 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted p-2 rounded">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">John_Doe_Resume_v2.docx</h4>
                              <p className="text-xs text-muted-foreground">Uploaded on June 3, 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "applications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                  <CardDescription>Track the status of your job applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Senior Frontend Developer</h4>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              TechCorp Inc.
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              San Francisco, CA
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Applied on May 20, 2023
                            </span>
                          </div>
                        </div>
                        <Badge>Interview Scheduled</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Frontend Engineer</h4>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              WebSolutions
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Remote
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Applied on May 15, 2023
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline">Application Submitted</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">UI Developer</h4>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              DesignHub
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              New York, NY
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Applied on May 10, 2023
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary">Rejected</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {activeTab === "saved" && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                  <CardDescription>Jobs you've saved for later</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Senior Frontend Developer</h4>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              TechCorp Inc.
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              San Francisco, CA
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Saved on May 22, 2023
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Apply
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">React Developer</h4>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              AppWorks
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Remote
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Saved on May 18, 2023
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Apply
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive emails about new job matches</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="email-notifications" className="sr-only">
                            Email Notifications
                          </Label>
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Application Updates</h4>
                          <p className="text-sm text-muted-foreground">Receive updates about your job applications</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="application-updates" className="sr-only">
                            Application Updates
                          </Label>
                          <input
                            type="checkbox"
                            id="application-updates"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Marketing Emails</h4>
                          <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="marketing-emails" className="sr-only">
                            Marketing Emails
                          </Label>
                          <input type="checkbox" id="marketing-emails" className="h-4 w-4 rounded border-gray-300" />
                        </div>
                      </div>
                    </div>
                    <Button>Save Preferences</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-destructive">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">JobBoard</h3>
              <p className="text-sm text-muted-foreground">
                Find the perfect job match for your skills and career goals.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Saved Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Career Advice
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Employer Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} JobBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
