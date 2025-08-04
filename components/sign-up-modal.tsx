"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border border-border">
        <div className="flex flex-col items-center gap-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Sign Up</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Sign up to unlock your personalized dashboard — coming soon. Track your progress, view tailored insights, and access your full diagnostic history once the full experience launches. Sign up now to be first in line when it goes live.
            </p>
          </div>
          
          {/* Form */}
          <form className="w-full space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Preferred Name"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Name of Company"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Industry"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Zip Code"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors transform hover:scale-105"
            >
              Sign Up Now
            </button>
          </form>
          
          {/* Privacy Statement */}
          <p className="text-center text-xs text-muted-foreground">
            Your information is secure and won't be shared. We'll notify you when the full experience launches.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 