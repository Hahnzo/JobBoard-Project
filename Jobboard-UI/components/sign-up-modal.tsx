"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("jobseeker")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = {
        firstName: (document.getElementById('firstName') as HTMLInputElement).value,
        lastName: (document.getElementById('lastName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement).value,
        role: role,
        company: role === 'employer' ? (document.getElementById('company') as HTMLInputElement).value : undefined,
        phone: (document.getElementById('phone') as HTMLInputElement).value
      }

      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      console.log('Registration successful:', data)
      onClose()
    } catch (error) {
      console.error('Registration error:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create your account</DialogTitle>
          <DialogDescription className="text-center">
            Join ProjectJob to find your perfect career match
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <RadioGroup defaultValue="jobseeker" className="grid grid-cols-2 gap-4 mb-4" onValueChange={setRole}>
            <div>
              <RadioGroupItem value="jobseeker" id="jobseeker" className="peer sr-only" />
              <Label
                htmlFor="jobseeker"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 [&:has([data-state=checked])]:border-emerald-500"
              >
                <span className="text-sm font-medium">Job Seeker</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="employer" id="employer" className="peer sr-only" />
              <Label
                htmlFor="employer"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 [&:has([data-state=checked])]:border-emerald-500"
              >
                <span className="text-sm font-medium">Employer</span>
              </Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>

          {role === "employer" && (
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" required />
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            By clicking Sign Up, you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Privacy Policy
            </a>
            .
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
