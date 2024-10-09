"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function CreatorDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Creator Dashboard</h1>
      
      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Your Campaigns</CardTitle>
              <CardDescription>Manage your ongoing and past campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add a list of campaigns here */}
              <p>You haven't created any campaigns yet.</p>
              <Button className="mt-4">Create New Campaign</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Your Content</CardTitle>
              <CardDescription>Manage your posts and exclusive content</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add a list of content here */}
              <p>You haven't created any content yet.</p>
              <Button className="mt-4">Create New Post</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View your performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add analytics charts and data here */}
              <p>No analytics data available yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}