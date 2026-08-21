import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskCard from './TaskCard';
import { Task } from '@/lib/types';

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Board Task',
    status: 'doing',
    priority: 'high',
    due_date: '2026-09-12T00:00:00.000Z',
    workspace_id: 'ws-1',
    assignees: [
      {
        id: 'u1',
        email: 'test@example.com',
        username: 'testuser',
        full_name: 'Test User',
        created_at: '',
        updated_at: ''
      }
    ],
    created_at: '',
    updated_at: ''
  };

  it('renders card details', () => {
    render(<TaskCard task={mockTask} />);

    // Title is always rendered
    expect(screen.getByText('Board Task')).toBeInTheDocument();
    // Assignee name is rendered
    expect(screen.getByText('Test User')).toBeInTheDocument();
    // Due date element exists (locale format varies across environments)
    expect(screen.getByText(/sep/i)).toBeInTheDocument();
  });
});

