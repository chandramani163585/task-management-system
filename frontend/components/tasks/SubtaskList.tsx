'use client';

import React, { useState } from 'react';
import { Subtask } from '@/lib/types';

interface SubtaskListProps {
  subtasks: Subtask[];
  onAdd: (title: string) => Promise<void>;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function SubtaskList({ subtasks, onAdd, onToggle, onDelete }: SubtaskListProps) {
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    setIsAdding(true);
    try {
      await onAdd(newTitle.trim());
      setNewTitle('');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Subtasks</h3>
        <span className="text-xs text-on-surface-variant">
          {subtasks.filter(s => s.is_completed).length} of {subtasks.length} completed
        </span>
      </div>

      <div className="border border-outline-variant rounded-xl overflow-hidden bg-surface shadow-sm">
        <ul className="divide-y divide-outline-variant">
          {subtasks.map(st => (
            <li key={st.id} className="flex items-center gap-3 p-3.5 hover:bg-surface-dim transition-colors group">
              <input 
                type="checkbox" 
                checked={st.is_completed} 
                onChange={(e) => onToggle(st.id, e.target.checked)}
                className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer accent-primary"
              />
              <span className={`flex-1 font-body-md text-body-md ${st.is_completed ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                {st.title}
              </span>
              <button 
                onClick={() => onDelete(st.id)}
                className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all p-1 rounded hover:bg-surface"
                title="Delete subtask"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </li>
          ))}
          {subtasks.length === 0 && (
            <li className="p-4 text-center text-on-surface-variant font-body-md text-sm italic">
              No subtasks added yet.
            </li>
          )}
        </ul>

        <div className="p-3 bg-surface border-t border-outline-variant flex items-center gap-2">
          <input 
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Add a new subtask..."
            disabled={isAdding}
            className="flex-1 bg-transparent border-none focus:ring-0 px-2 py-1 font-body-md text-sm outline-none text-on-surface placeholder:text-on-surface-variant"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={isAdding || !newTitle.trim()}
            className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container disabled:opacity-50 transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
