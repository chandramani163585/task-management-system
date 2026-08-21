'use client';

import React, { useState } from 'react';
import { TaskResource } from '@/lib/types';

interface ResourceListProps {
  resources: TaskResource[];
  onAdd: (url: string, title?: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ResourceList({ resources, onAdd, onDelete }: ResourceListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      await onAdd(url.trim(), title.trim() || undefined);
      setUrl('');
      setTitle('');
      setIsAdding(false);
    } catch (e) {
      // toast in parent
    }
  };

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/60">
      <div className="flex items-center justify-between">
        <span className="font-label-md text-label-md font-semibold text-on-surface">Resources & Links</span>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs text-primary hover:underline flex items-center gap-0.5"
        >
          <span className="material-symbols-outlined text-[14px]">add</span> Add Link
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-surface-dim p-3 rounded-lg flex flex-col gap-2 animate-in fade-in">
          <input
            type="text"
            placeholder="Link Title (e.g. Figma Prototype)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="url"
            placeholder="URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="text-xs px-2.5 py-1.5 rounded border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs px-2 py-1 text-on-surface-variant hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs px-3 py-1 bg-primary text-white font-medium rounded hover:bg-primary-container"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-1.5">
        {resources.map(res => (
          <div key={res.id} className="flex items-center justify-between p-2 rounded-lg bg-surface hover:bg-surface-dim transition-colors group border border-outline-variant/40">
            <a 
              href={res.url} 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs text-primary hover:underline flex items-center gap-1.5 truncate max-w-[200px]"
            >
              <span className="material-symbols-outlined text-[15px]">link</span>
              <span className="truncate">{res.title || res.url}</span>
            </a>
            <button 
              onClick={() => onDelete(res.id)} 
              className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all p-0.5 rounded"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        ))}
        {resources.length === 0 && !isAdding && (
          <span className="text-xs text-on-surface-variant italic">No links attached</span>
        )}
      </div>
    </div>
  );
}
