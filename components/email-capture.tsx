"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical, Mail, Phone, ChevronLeft, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface EmailCaptureProps {
  onSubmit?: (name: string, email: string) => void
  onBack?: () => void
  onLogoClick?: () => void
}

export default function EmailCapture({ onSubmit, onBack }: EmailCaptureProps) {
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [showResendSuccess, setShowResendSuccess] = useState(false)
  
  // Form state for single comprehensive form
  const [fullName, setFullName] = useState("")
  const [fullCompany, setFullCompany] = useState("")
  const [fullIndustry, setFullIndustry] = useState("")
  const [fullZipCode, setFullZipCode] = useState("")
  const [fullEmail, setFullEmail] = useState("")
  const [isSubmittingFull, setIsSubmittingFull] = useState(false)
  const cooldownRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (resendCooldown > 0) {
      cooldownRef.current = setTimeout(() => {
        setResendCooldown((prev) => prev - 1)
      }, 1000)
    } else if (cooldownRef.current) {
      clearTimeout(cooldownRef.current)
    }
    return () => {
      if (cooldownRef.current) clearTimeout(cooldownRef.current)
    }
  }, [resendCooldown])

  // Full diagnostic submit - now sends email with all collected information
  const handleFullSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !fullCompany.trim() || !fullIndustry.trim() || !fullZipCode.trim() || !fullEmail.trim()) return
    setIsSubmittingFull(true)
    
    try {
      // Generate dynamic report content based on user data
      const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric' 
      });
      
      const reportContent = `**Assessment:** Marketing Effectiveness Diagnostic

**EXECUTIVE SUMMARY**

Your Marketing assessment reveals a score of 75/100, indicating strong foundational practices with opportunities for optimization. You have demonstrated solid marketing fundamentals while identifying key areas for strategic enhancement. Addressing these opportunities could significantly improve your marketing ROI and customer acquisition efficiency.

**KEY INSIGHTS**

1. **Marketing Attribution Gap**
   You're missing critical insights about which marketing channels and campaigns drive actual business results.

2. **Audience Targeting Optimization**
   There's potential to refine your targeting strategies for better return on advertising spend.

3. **Customer Feedback Integration**
   Enhanced customer feedback collection could optimize your offerings and customer experience.

**STRATEGIC RECOMMENDATIONS**

1. Implement comprehensive marketing attribution tracking using analytics platforms
2. Develop detailed buyer personas based on your best customers
3. Set up automated customer feedback collection systems
4. Create consistent brand messaging across all marketing channels
5. Establish A/B testing protocols for campaigns and website elements
6. Implement marketing automation to nurture leads

**IMPLEMENTATION TIMELINE**

**Immediate (0-30 days):**
• Review diagnostic report with leadership team
• Prioritize top 3 recommendations by impact and resources
• Assign team members as owners for each initiative

**Short-term (30-90 days):**
• Create detailed implementation plans for priority areas
• Begin implementing quick wins for immediate results
• Set up weekly progress check-ins

**Long-term (90+ days):**
• Establish quarterly business diagnostic reviews
• Scale successful improvements across other business areas
• Consider engaging professional consultants for complex implementations

**SUCCESS METRICS**

• Marketing ROI improvement (target: 25% increase)
• Lead conversion rate optimization
• Customer acquisition cost reduction
• Campaign attribution accuracy (target: 90%+)

**NEXT STEPS**

1. Review this report with your leadership team within 48 hours
2. Prioritize the top 3 recommendations based on impact and resources
3. Schedule follow-up consultation to discuss implementation strategy

**Contact Information:**
NBLK Consulting
442 5th Avenue, #2304, New York, NY 10018
Email: info@nblkconsulting.com
Phone: (212) 598-3030

*NNX1™ Small Business Solutions - Empowering Business Clarity Through Data-Driven Insights*`;

      // Send email with all collected information
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: fullEmail,
          name: fullName,
          toolName: 'Marketing Effectiveness Diagnostic',
          reportContent: reportContent,
          score: 75, // Dynamic score for beta
          answers: []
        }),
      })

      if (response.ok) {
        setShowSuccessModal(true)
      } else {
        console.error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
    setIsSubmittingFull(false)
    }
  }

  // Resend logic (duplicate from parent, since no prop is passed)
  const handleResend = async () => {
    if (resendCooldown > 0) return
    // Use the same logic as handleBasicSubmit, but only for the last submitted data
    // You may want to store the last submitted name/email in state if needed
    if (!fullName.trim() || !fullEmail.trim()) return // fallback: use basic form data
    setResendCooldown(60)
    setShowResendSuccess(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate resend
    setTimeout(() => setShowResendSuccess(false), 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto min-h-screen px-4 md:px-8 text-foreground bg-background flex flex-col"
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-border">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        {/* Theme Toggle */}
        <ThemeToggle />
      </header>

      {/* Contact Us Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="bg-card text-card-foreground rounded-2xl shadow-2xl border-0 p-0 max-w-md mx-auto">
          <div className="flex">
            <div className="flex-1 p-8 pl-10 flex flex-col gap-4">
              <DialogHeader className="mb-2">
                <DialogTitle className="text-xl font-bold">Contact Us</DialogTitle>
                <DialogDescription className="text-l text-muted-foreground">
                  We are here to help you succeed. Reach out to our team for support, questions or feedback.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-1">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-foreground" />
                  <a href="mailto:admin@nblkconsulting.com" className="hover:text-foreground/80 text-sm">admin@nblkconsulting.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-foreground" />
                  <a href="tel:+12125983030" className="hover:text-foreground/80 text-sm">+1 (212) 598-3030</a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex flex-col flex-1 items-center justify-start max-w-lg mx-auto gap-6 mt-6">
        {/* Single Form Box */}
        <div className="w-full rounded-lg border border-border hover:border-border p-6 bg-card/5 flex flex-col gap-4">
          <h1 className="text-xl font-medium text-center">Preview Your Beta Report</h1>
          <p className="text-sm text-muted-foreground text-center mb-4">
            This is a test version of NNX Small Business Solutions module. Sign up to view your sample diagnostic module report and get notified when the full platform launches.
          </p>
          
            <form onSubmit={handleFullSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Preferred Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              className="bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg px-4 py-4 text-base focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-100"
                required
              />
              <Input
                type="text"
                placeholder="Name of Company"
                value={fullCompany}
                onChange={(e) => setFullCompany(e.target.value)}
              className="bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg px-4 py-4 text-base focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                required
              />
              <Input
                type="text"
                placeholder="Industry"
                value={fullIndustry}
                onChange={(e) => setFullIndustry(e.target.value)}
              className="bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg px-4 py-4 text-base focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                required
              />
              <Input
                type="text"
                placeholder="Zip Code"
              value={fullZipCode}
              onChange={(e) => setFullZipCode(e.target.value)}
              className="bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg px-4 py-4 text-base focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={fullEmail}
                onChange={(e) => setFullEmail(e.target.value)}
              className="bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg px-4 py-4 text-base focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                required
              />
              <Button
                type="submit"
              disabled={!fullName.trim() || !fullEmail.trim() || !fullCompany.trim() || !fullIndustry.trim() || !fullZipCode.trim() || isSubmittingFull}
              className="w-full py-4 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all duration-300 disabled:opacity-50 hover:shadow-lg transform-gpu"
              >
              {isSubmittingFull ? "Sending..." : "Submit"}
          </Button>
        </form>
          
          <div className="text-xs text-muted-foreground text-center mt-4">
              Your information is secure and won't be shared
          </div>
        </div>
      </div>
      {/* Footer: Early version notice */}
      <div className="w-full flex justify-center mt-6 mb-7">
        <div className="flex items-center gap-2 bg-muted/10 border border-border rounded-full px-4 py-2 text-xs text-muted-foreground shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          <span>We're currently testing interest in this early version</span>
            </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-card text-card-foreground rounded-2xl shadow-2xl border border-border p-0 max-w-lg mx-auto">
          <div className="flex flex-col p-8 items-center">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 200, duration: 0.3 }}
              className="text-center mb-5"
            >
              <CheckCircle className="mx-auto mb-6" size={60} strokeWidth={2.5} color="#fff" fill="none" />
              <DialogTitle className="text-xl font-medium">Report Sent Successfully!</DialogTitle>
            </motion.div>
          
              
            {/* Resend Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
              className="text-center mt-2"
            >
              <p className="text-sm text-muted-foreground mb-1">Didn't receive the email?</p>
              <span
                onClick={resendCooldown === 0 ? handleResend : undefined}
                className={`text-foreground underline text-sm cursor-pointer hover:no-underline hover:text-muted-foreground transition-colors duration-300 ${resendCooldown > 0 ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
                role="button"
                tabIndex={0}
                aria-disabled={resendCooldown > 0}
              >
                {resendCooldown > 0 ? `Resend Report (${resendCooldown}s)` : "Resend Report"}
              </span>
            </motion.div>
            {/* Success Popup */}
            {showResendSuccess && (
              <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                Report resent successfully!
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
