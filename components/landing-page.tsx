"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, X as CloseIcon } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import PhaseAssessmentModal from "./phase-assessment-modal"

interface LandingPageProps {
  onExploreTools: () => void
  onLearnMore: () => void
  onToolList: () => void
  onTest: () => void
  onDashboard: () => void
  onContact: () => void
  onLogoClick: () => void
}

export default function LandingPage({ onExploreTools, onLearnMore, onToolList, onTest, onDashboard, onContact, onLogoClick }: LandingPageProps) {
  const [dialogOpen, setDialogOpen] = useState<string | null>(null)
  const [phaseModalOpen, setPhaseModalOpen] = useState(false)

  const footerLinks = [
    {
      id: "about-us",
      title: "About Us",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      content: "NNX1 is powered by the NNX1™ Diagnostic Engine, developed and licensed by NBLK LLC. As a product of NBLK, NNX1 adheres to the same data handling, protection, and privacy standards outlined in the NBLK Privacy Policy.\n\nYou can review the full policy here: www.n-blk.com/privacy"
    },
    {
      id: "sitemap",
      title: "Sitemap",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    },
    {
      id: "terms-of-use",
      title: "Terms of Use",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Navigation Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={onLogoClick}
            className="text-2xl font-bold text-foreground transition-transform hover:scale-105 cursor-pointer"
          >
            NNX1
          </button>
          
          <nav className="hidden md:flex items-center space-x-10">
            <button 
              onClick={onLearnMore}
              className="text-foreground hover:text-muted-foreground transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={onToolList}
              className="text-foreground hover:text-muted-foreground transition-colors font-medium"
            >
              Diagnostic Tool
            </button>
            <button 
              onClick={onTest}
              className="text-foreground hover:text-muted-foreground transition-colors font-medium"
            >
              Test
            </button>
            <button 
              onClick={onDashboard}
              className="text-foreground hover:text-muted-foreground transition-colors font-medium"
            >
              Dashboard
            </button>
            <button 
              onClick={onContact}
              className="text-foreground hover:text-muted-foreground transition-colors font-medium"
            >
              Contact
            </button>
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Mobile menu button */}
            <button className="md:hidden text-foreground hover:text-muted-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-10 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        >
          <h1 className="mb-4 text-3xl md:text-5xl font-bold text-foreground">
            Small Business Solutions by NNX1
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="text-l text-muted-foreground mb-8"
        >
          Try a quick business self-check. No signup needed - just pick a topic and go​
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            onClick={onExploreTools}
            size="sm"
            className="text-sm px-9 py-6 rounded-xl group bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={() => setPhaseModalOpen(true)}
            size="sm"
            className="text-sm px-9 py-6 rounded-xl group bg-transparent border-2 border-border text-foreground hover:border-border/50 hover:bg-muted/50"
          >
            Find My Phase
          </Button>
        </motion.div>
      </div>
      
      <footer className="sticky left-0 right-0 bottom-0 py-6 bg-background backdrop-blur-md border-t border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80 text-muted-foreground mb-5"> NNX1 is your intelligent business companion — built for small businesses, nonprofits & founders managing growth or complexity. Powered by the NNX1™ engine (patent pending), developed and licensed by NBLK LLC, this tool turns intuitive answers into expert insights and clear, actionable recommendations. Based on years of research, NNX1 is designed with the human element in mind and built around key indicators of business success, scale & growth. No fees, no fluff — just diagnostics that adapt to your journey.</p>
          
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center items-center text-sm">
            {footerLinks.map((link, index) => (
              <div key={link.id} className="flex items-center">
                <button
                  onClick={() => setDialogOpen(link.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </button>
                {index < footerLinks.length - 1 && (
                  <span className="text-muted-foreground mx-4"> | </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Footer Link Dialogs */}
      {footerLinks.map((link) => (
        <Dialog key={link.id} open={dialogOpen === link.id} onOpenChange={() => setDialogOpen(null)}>
          <DialogContent className="max-w-xl bg-card border border-border">
            <div className="flex flex-col items-left gap-4">
              {/* Header with close button */}
              <div className="flex items-left justify-between w-full mb-1">
                <div className="text-lg font-semibold text-foreground">{link.title}</div>
                {/* Removed duplicate close button - DialogContent has built-in close */}
              </div>
              
              {/* Content */}
              <div className="w-full bg-muted border border-border rounded-lg p-4">
                <div className="text-muted-foreground text-sm leading-relaxed">
                  {link.id === "privacy-policy" ? (
                    <>
                      NNX1 is powered by the NNX1™ Diagnostic Engine, developed and licensed by NBLK LLC. As a product of NBLK, NNX1 adheres to the same data handling, protection, and privacy standards outlined in the NBLK Privacy Policy.
                      <br /><br />
                      You can review the full policy here:{" "}
                      <a
                        href="https://www.n-blk.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        www.n-blk.com/privacy
                      </a>
                    </>
                  ) : (
                    link.content
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}

      {/* Phase Assessment Modal */}
      <PhaseAssessmentModal
        isOpen={phaseModalOpen}
        onClose={() => setPhaseModalOpen(false)}
        onExploreTools={onExploreTools}
      />
    </div>
  )
}
