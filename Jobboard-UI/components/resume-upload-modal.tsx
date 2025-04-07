"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, Check, X, FileText } from "lucide-react"

interface ResumeUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete: () => void
}

export default function ResumeUploadModal({ isOpen, onClose, onUploadComplete }: ResumeUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

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
  }

  const handleUpload = () => {
    if (!file) return

    setUploadStatus("uploading")

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus("success")

        // Simulate processing time
        setTimeout(() => {
          onUploadComplete()
        }, 1000)
      }
    }, 300)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setUploadProgress(0)
    setUploadStatus("idle")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            Upload your resume to get personalized job matches based on your skills and experience.
          </DialogDescription>
        </DialogHeader>

        {uploadStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-emerald-100 rounded-full p-3 mb-4">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Resume Uploaded Successfully!</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              We're analyzing your resume to find the best job matches for you.
            </p>
            <Button onClick={onUploadComplete}>View Matched Jobs</Button>
          </div>
        ) : (
          <>
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mx-auto flex flex-col items-center justify-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <h3 className="font-medium">Upload your resume</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your resume file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, DOC (Max 5MB)</p>
                  <label htmlFor="resume-upload">
                    <Button variant="outline" className="mt-2 cursor-pointer">
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
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {uploadStatus === "uploading" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={uploadStatus === "uploading"}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {uploadStatus === "uploading" ? "Uploading..." : "Upload Resume"}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

