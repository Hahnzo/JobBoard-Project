"use client"

import type React from "react"

import { useState } from "react"
import { Bookmark, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define the Project type
export type Project = {
  id: number
  title: string
  description: string
  fullDescription?: string[]
  company: string
  logo: string
  logoBackground: string
  tags: string[]
  rating: number
  verified: boolean
  proposals: string
  reviews?: number
  successProjects?: number
  totalSpent?: string
  paymentVerified?: boolean
}

interface ProjectListingsProps {
  projects: Project[]
  selectedProjectId: number
  onSelectProject: (id: number) => void
}

export default function ProjectListings({ projects, selectedProjectId, onSelectProject }: ProjectListingsProps) {
  const [savedProjects, setSavedProjects] = useState<number[]>([])

  const toggleSaveProject = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card click
    if (savedProjects.includes(id)) {
      setSavedProjects(savedProjects.filter((projectId) => projectId !== id))
    } else {
      setSavedProjects([...savedProjects, id])
    }
  }

  return (
    <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer border-l-4 ${
            selectedProjectId === project.id ? "border-emerald-500" : "border-transparent"
          }`}
          onClick={() => onSelectProject(project.id)}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              <div
                className="h-10 w-10 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: project.logoBackground }}
              >
                <img src={project.logo || "/placeholder.svg"} alt={`${project.company} logo`} className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-medium text-sm">{project.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{project.description}</p>
              </div>
            </div>

            <button onClick={(e) => toggleSaveProject(project.id, e)} className="text-gray-400 hover:text-gray-600">
              <Bookmark className="h-5 w-5" fill={savedProjects.includes(project.id) ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < project.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="bg-blue-500 text-white rounded-full p-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span>Project Verified</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Add scrollbar styling
const scrollbarStyles = `
  /* For Webkit browsers like Chrome/Safari */
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 20px;
  }

  /* For Firefox */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }
`

// Add style tag to head
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = scrollbarStyles
  document.head.appendChild(style)
}

