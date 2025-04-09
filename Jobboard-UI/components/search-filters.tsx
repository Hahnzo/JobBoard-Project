"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase } from "lucide-react"

export default function SearchFilters() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 flex flex-col md:flex-row">
      <div className="flex-1 border-r border-gray-200 dark:border-gray-700 p-2 flex items-center">
        <div className="mr-2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search position or company"
          className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
        />
      </div>

      <div className="flex-1 md:border-r border-gray-200 dark:border-gray-700 p-2 flex items-center">
        <div className="mr-2 text-gray-400">
          <MapPin className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Ankara"
          className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
        />
      </div>

      <div className="flex-1 md:border-r border-gray-200 dark:border-gray-700 p-2 flex items-center">
        <div className="mr-2 text-gray-400">
          <Briefcase className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Experience"
          className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
        />
      </div>

      <div className="flex-1 p-2 flex items-center">
        <div className="mr-2 text-gray-400">
          <Clock className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="In this week"
          className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
        />
      </div>

      <div className="p-2">
        <Button className="bg-indigo-700 hover:bg-indigo-800 text-white w-full md:w-auto">Search</Button>
      </div>
    </div>
  )
}
