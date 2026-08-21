'use client';

import React, { useState } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Comment } from '@/lib/types';

interface CommentListProps {
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
  onDeleteComment?: (id: string) => Promise<void>;
}

export default function CommentList({ comments, onAddComment, onDeleteComment }: CommentListProps) {
  const [newComment, setNewComment] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSending(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Activity & Discussion</h3>
        <span className="text-xs text-on-surface-variant">{comments.length} comments</span>
      </div>
      
      <div className="space-y-3">
        {comments.map(comment => {
          const authorName = comment.author?.full_name || comment.author?.name || comment.author?.username || 'Team Member';
          return (
            <div key={comment.id} className="border border-outline-variant rounded-xl p-4 bg-surface flex flex-col gap-2.5 shadow-sm group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar 
                    src={comment.author?.avatar_url} 
                    fallback={authorName.charAt(0).toUpperCase()} 
                    size="sm" 
                  />
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">{authorName}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant ml-2">
                      {new Date(comment.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {onDeleteComment && (
                  <button 
                    onClick={() => onDeleteComment(comment.id)}
                    className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all p-1 rounded hover:bg-surface-dim"
                    title="Delete comment"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                )}
              </div>
              <div className="font-body-md text-body-md text-on-surface pl-10">
                {comment.content}
              </div>
            </div>
          );
        })}

        {comments.length === 0 && (
          <div className="p-6 text-center text-on-surface-variant text-sm italic border border-dashed border-outline-variant rounded-xl">
            No comments yet. Start the conversation!
          </div>
        )}
      </div>

      {/* Add Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
        <input 
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          disabled={isSending}
          className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant outline-none"
        />
        <button 
          type="submit" 
          disabled={isSending || !newComment.trim()}
          className="text-primary hover:text-primary-container disabled:opacity-40 transition-colors p-1.5 rounded-lg hover:bg-primary/10 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </form>
    </div>
  );
}
