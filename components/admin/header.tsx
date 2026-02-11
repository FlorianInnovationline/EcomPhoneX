"use client"

// TODO: Implement sign out when auth is added
// import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function AdminHeader() {
  const handleSignOut = async () => {
    // TODO: Uncomment when auth is implemented
    // await signOut({ callbackUrl: "/" })
    console.log("Sign out - to be implemented")
  }

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-8">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 h-10 bg-muted/30 border-border/50 font-light text-sm rounded-xl focus:bg-background transition-colors"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
          <Bell className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSignOut}
          className="rounded-xl font-light text-sm h-10 px-4 hover:bg-muted/50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  )
}
