"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Bell, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const handleSignOut = async () => {
    // TODO: Uncomment when auth is implemented
    // await signOut({ callbackUrl: "/" })
    console.log("Sign out - to be implemented")
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 lg:h-20 items-center gap-3 sm:gap-4 border-b border-border/50 bg-background/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      {/* Menu button: visible on mobile/tablet only */}
      {onMenuClick && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden shrink-0 h-10 w-10 rounded-xl"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 h-9 sm:h-10 bg-muted/30 border-border/50 font-light text-sm rounded-xl focus:bg-background transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 sm:h-10 sm:w-10" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="rounded-xl font-light text-sm h-9 sm:h-10 px-3 sm:px-4 hover:bg-muted/50"
        >
          <LogOut className="mr-1.5 sm:mr-2 h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  )
}
