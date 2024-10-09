"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react'

type Comment = {
  id: number
  user: string
  content: string
  date: string
}

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const { data: session } = useSession()

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      alert('Please log in to comment')
      return
    }
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: session.user?.name || 'Anonymous',
        content: newComment.trim(),
        date: new Date().toISOString(),
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <form onSubmit={handleSubmitComment} className="mb-4">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            <Avatar>
              <AvatarFallback>{comment.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{comment.user}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}