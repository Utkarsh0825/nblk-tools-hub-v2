"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Database, TrendingUp, DollarSign, TestTube2, Settings, Grab, LucideGitGraph } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Mail, Phone } from "lucide-react"
import { useState, useRef, useEffect } from "react"

import { X as CloseIcon } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface ToolsHubProps {
  onToolSelect: (toolName: string) => void
  onLogoClick: () => void
  completedTools?: string[]
  onLearnMore: () => void
  onToolList: () => void
  onTest: () => void
  onDashboard: () => void
  onContact: () => void
  onHome: () => void
}

const tools = [
  {
    id: "data-hygiene",
    name: "Data Hygiene & Business Clarity",
    backendName: "Data Hygiene & Business Clarity Diagnostic",
    description: "Evaluate if your data systems are aligned, accessible and clean across teams",
    icon: Database,
  },
  {
    id: "marketing-effectiveness",
    name: "Marketing Effectiveness",
    backendName: "Marketing Effectiveness Diagnostic",
    description: "Discover if your marketing efforts are reaching the right people at the right time",
    icon: TrendingUp,
  },
  {
    id: "cash-flow",
    name: "Cash Flow & Financial Growth",
    backendName: "Cash Flow & Financial Clarity Diagnostic",
    description: "Understand and optimize your business cash flow and spending",
    icon: DollarSign,
  },
]

const placeholderTools = [
  {
    id: "operational-efficiency",
    name: "Operational Efficiency",
    description: "Optimize your business operations and improve efficiency across all departments",
    icon: TestTube2,
  },
  {
    id: "customer-retention",
    name: "Customer Retention & Growth",
    description: "Build stronger customer relationships and drive sustainable business growth",
    icon: Settings,
  },
  {
    id: "team-support",
    name: "Support & Grow Your Team",
    description: "Develop your team's capabilities and create a thriving workplace culture",
    icon: LucideGitGraph,
  },
]

export default function ToolsHub({ onToolSelect, onLogoClick, completedTools = [], onLearnMore, onToolList, onTest, onDashboard, onContact, onHome }: ToolsHubProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [completionTimes, setCompletionTimes] = useState<Record<string, number>>({})

  // Initialize completion times from sessionStorage
  useEffect(() => {
    const storedTimes = sessionStorage.getItem('toolCompletionTimes')
    if (storedTimes) {
      setCompletionTimes(JSON.parse(storedTimes))
    }
  }, [])

  // Update completion times when completedTools changes
  useEffect(() => {
    const currentTime = Date.now()
    const newTimes = { ...completionTimes }
    let hasChanges = false

    // Find newly completed tools (tools that are in completedTools but not in completionTimes)
    completedTools.forEach(toolName => {
      if (!completionTimes[toolName]) {
        newTimes[toolName] = currentTime
        hasChanges = true
      }
    })

    if (hasChanges) {
      setCompletionTimes(newTimes)
      sessionStorage.setItem('toolCompletionTimes', JSON.stringify(newTimes))
    }
  }, [completedTools]) // Only depend on completedTools, not completionTimes

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return "a while ago"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    return `${days} days ago`
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index)
  }

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [dropdownOpen])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
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

      {/* Page Content */}
      <main className="mt-5 flex-1 px-6 py-2 max-w-5xl mx-auto w-full">
        

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Main Tools */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Available Tools</h2>
            <div className="space-y-3" ref={cardsContainerRef}>
              {tools.map((tool, index) => {
                const isOpen = expandedIndex === index
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    // transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer"
                  >
                    <Card
                      onClick={() => toggleExpand(index)}
                      className="transition-all bg-card border border-border hover:shadow-lg"
                    >
                      <CardHeader className="flex flex-row items-center gap-5">
                        <div className="flex items-center gap-4">
                          <tool.icon className="w-8 h-8 text-foreground" />
                          <div className="flex-1">
                            <CardTitle className="text-foreground text-base tracking-normal">{tool.name}</CardTitle>
                            {completedTools.includes(tool.backendName) && completionTimes[tool.backendName] && (
                              <p className="text-xs text-green-600 dark:text-green-200 mt-1 opacity-80">
                                completed {getTimeAgo(completionTimes[tool.backendName])}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      {/* Expanded content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <CardContent className="pt-0 pb-4 px-11">
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onToolSelect(tool.backendName)
                                }}
                                className="text-sm w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                size="lg"
                              >
                                Start Diagnostic
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </motion.div>
                          </CardContent>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Placeholder Tools */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Coming Soon</h2>
            <div className="space-y-3">
              {placeholderTools.map((tool, index) => {
                const isOpen = expandedIndex === index + tools.length
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    // transition={{ type: 'spring', stiffness: 300, damping: 20, delay: (index + tools.length) * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer"
                  >
                    <Card
                      onClick={() => toggleExpand(index + tools.length)}
                      className="transition-all bg-card border border-border opacity-80"
                    >
                      <CardHeader className="flex flex-row items-center gap-5">
                        <div className="flex items-center gap-4">
                          <tool.icon className="w-8 h-8 text-muted-foreground" />
                          <div className="flex-1">
                            <CardTitle className="text-muted-foreground text-base tracking-normal">{tool.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>

                      {/* Expanded content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <CardContent className="pt-0 pb-4 px-11">
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                              <Button
                                disabled
                                className="text-sm w-full bg-muted/70 border-2 border-border text-muted-foreground cursor-not-allowed"
                                size="lg"
                              >
                                Coming Soon
                              </Button>
                            </motion.div>
                          </CardContent>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
        {/* Completion Status Box */}
        
      </main> 

      {/* Footer */}
      <footer className="sticky left-0 right-0 bottom-0 py-6 bg-background backdrop-blur-md border-t border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* <p className="text-sm text-muted-foreground mb-5"> Nex1 is your intelligent business companion — built for small businesses, nonprofits, and founders navigating growth, hiring, or operational complexity. Powered by the patented NNX1 diagnostic platform (licensed from NBLK), our tool translates intuitive answers into deep, expert-level insights. Whether you're planning your next hire, refining your operations, or just starting out, Nex1 helps you uncover blind spots, identify strengths, and get AI-powered recommendations—no technical knowledge required. No monthly fees. No fluff. Just focused, research-backed diagnostics that adapt to your unique journey. We're currently in beta and welcoming early users. Your feedback will help us shape the next evolution in small business intelligence. Nex1: The smarter, simpler way to move forward.</p> */}
          
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
