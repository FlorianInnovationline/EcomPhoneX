"use client"

import { useState } from "react"
import { Section, SectionHeader } from "@/components/storefront/section"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-2xl">
          <SectionHeader 
            title="Contact Us" 
            subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-2xl">
          {submitted ? (
            <div className="text-center py-16">
              <div className="text-2xl font-light mb-4">Thank you!</div>
              <p className="text-muted-foreground/80 font-light">
                We've received your message and will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-full"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="rounded-full"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="rounded-full"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="rounded-2xl resize-none"
                />
              </div>
              <Button type="submit" className="w-full rounded-full">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </Section>
    </div>
  )
}
