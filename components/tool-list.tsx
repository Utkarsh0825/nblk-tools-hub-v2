"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, X as CloseIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface ToolListProps {
  onBack: () => void
  onToolsHub: () => void
}

export default function ToolList({ onBack, onToolsHub }: ToolListProps) {
  const [dialogOpen, setDialogOpen] = useState<string | null>(null)

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
      {/* Sticky Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-foreground hover:text-muted-foreground transition-colors p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h1 className="mt-2 text-xl md:text-2xl font-bold text-foreground absolute left-1/2 transform -translate-x-1/2">
            NNX1™ Diagnostic Tool
          </h1>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center flex-1 text-center max-w-4xl mx-auto pt-8">

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          className="text-left space-y-8"
        >
          <div className="space-y-3">
            <p className="text-base text-muted-foreground leading-relaxed">
              NNX1™ is not just a tool — it's a powerful, research-backed diagnostic system designed to help small businesses and nonprofits thrive. Built around the key indicators that drive real business success, it looks at your operations, finances, marketing, team, and more — all through the lens of your industry and growth stage.
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-base text-muted-foreground leading-relaxed">
              Each module is simple to complete, at your own pace, and contributes to a full diagnostic report once all are finished. Along the way, you'll get actionable recommendations, auto-generated job descriptions, intern matching, and connections to other businesses who can help — or need your help.
            </p>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">NNX1™ stands for:</h2>
            <ul className="text-base text-muted-foreground leading-relaxed space-y-2 ml-4">
              <li><strong>N</strong> – Network of small business owners</li>
              <li><strong>N</strong> – Neural collaboration powering shared intelligence</li>
              <li><strong>X</strong> – Exchange of experience, ideas, and support</li>
              <li><strong>1</strong> – Putting small business owners first</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <p className="text-base text-muted-foreground leading-relaxed">
              This is more than software — it's a hub for growth, powered by real business needs.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={onToolsHub}
              size="lg"
              className="w-full bg-primary text-primary-foreground opacity-90 hover:bg-primary/90"
            >
              Explore Diagnostic Tools
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="sticky left-0 right-0 bottom-0 py-6 bg-background backdrop-blur-md border-t border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
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
    </div>
  )
} 