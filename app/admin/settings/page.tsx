"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Settings</h1>
        <p className="text-muted-foreground/80 font-light">
          Manage your store settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-light">Store Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-light text-muted-foreground/80 mb-2 block">Store Name</label>
            <Input defaultValue="Xeno Mobile" className="font-light" />
          </div>
          <div>
            <label className="text-sm font-light text-muted-foreground/80 mb-2 block">Currency</label>
            <Input defaultValue="EUR" disabled className="font-light" />
          </div>
          <div>
            <label className="text-sm font-light text-muted-foreground/80 mb-2 block">Default Language</label>
            <Input defaultValue="English" className="font-light" />
          </div>
          <Button className="rounded-full font-light">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
