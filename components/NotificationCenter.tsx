"use client"

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Notification = {
  id: number
  message: string
  date: string
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // In a real application, you would fetch notifications from an API
    setNotifications([
      { id: 1, message: 'New post from Alice Johnson', date: '2023-05-20' },
      { id: 2, message: 'Your support was received by Bob Smith', date: '2023-05-19' },
    ])
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <CardDescription>No new notifications</CardDescription>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id}>
                <div>
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </CardContent>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}