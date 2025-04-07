"use client"

import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/components/project-listings"

interface ProjectDetailProps {
  project: Project
  onApplyClick: () => void
}

export default function ProjectDetail({ project, onApplyClick }: ProjectDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-medium mb-2">{project.title}</h1>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Project Overview</h2>
        {project.fullDescription ? (
          project.fullDescription.map((paragraph, index) => (
            <p key={index} className="text-sm text-gray-600 mb-2">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Skills and Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-0 rounded-md">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Detail Project</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">
              {project.rating.toFixed(2)} of {project.reviews || 0} reviews
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < project.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{project.successProjects || 0} success project</div>
            <div className="flex items-center gap-1 text-xs">
              <div className="bg-blue-500 text-white rounded-full p-0.5">
                <Check className="h-3 w-3" />
              </div>
              <span>Project Verified</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{project.totalSpent || "$0"} total spent</div>
            {project.paymentVerified && (
              <div className="flex items-center gap-1 text-xs">
                <div className="bg-blue-500 text-white rounded-full p-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span>Payment Verified</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-md p-2">
          <input
            type="text"
            value={`https://www.jobored.com/project/${project.id}`}
            readOnly
            className="bg-transparent border-0 text-xs flex-1 focus:outline-none"
          />
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onApplyClick}>
        Apply for Job
      </Button>
    </div>
  )
}

