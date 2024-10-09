"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
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
      <h1 className="text-4xl font-bold mb-8">Welcome, {session.user?.name}</h1>
      
      <Tabs defaultValue="contributions">
        <TabsList>
          <TabsTrigger value="contributions">My Contributions</TabsTrigger>
          <TabsTrigger value="content">Exclusive Content</TabsTrigger>
        </TabsList>
        <TabsContent value="contributions">
          <Card>
            <CardHeader>
              <CardTitle>Your Contributions</CardTitle>
              <CardDescription>A summary of your support to creators</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add a list or grid of contributions here */}
              <p>You haven't made any contributions yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Exclusive Content</CardTitle>
              <CardDescription>Special content from creators you support</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add a list or grid of exclusive content here */}
              <p>No exclusive content available yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}