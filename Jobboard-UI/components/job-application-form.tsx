"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Check, X, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface JobApplicationFormProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  companyName: string
}

export default function JobApplicationForm({ isOpen, onClose, jobTitle, companyName }: JobApplicationFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      handleFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      handleFile(selectedFile)
    }
  }

  const handleFile = (selectedFile: File) => {
    // Check if file is PDF, DOCX, or DOC
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ]
    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF, DOCX, or DOC file")
      return
    }

    // Check if file size is less than 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    setFile(selectedFile)

    // Simulate upload progress
    setUploadStatus("uploading")
    let progress = 0
    const interval = setInterval(() => {
      progress += 20
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus("success")
      }
    }, 300)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setUploadProgress(0)
    setUploadStatus("idle")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setApplicationSubmitted(true)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Submit your application to {companyName} for the {jobTitle} position.
          </DialogDescription>
        </DialogHeader>

        {applicationSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-emerald-100 rounded-full p-3 mb-4">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Application Submitted Successfully!</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Your application has been sent to {companyName}. They will contact you if they're interested.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" />
            </div>

            <div className="space-y-2">
              <Label>Resume/CV</Label>
              {!file ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                    isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your resume file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, DOC (Max 5MB)</p>
                    <label htmlFor="resume-upload">
                      <Button variant="outline" className="mt-2 cursor-pointer" type="button">
                        Browse Files
                      </Button>
                      <input
                        id="resume-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleRemoveFile} type="button">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {uploadStatus === "uploading" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover Letter</Label>
              <Textarea id="cover-letter" placeholder="Tell us why you're a good fit for this position..." rows={5} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
              <Input id="portfolio" type="url" placeholder="https://your-portfolio.com" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={isSubmitting || !file || uploadStatus === "uploading"}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

