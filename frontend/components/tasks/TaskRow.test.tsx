import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskRow from './TaskRow';
import { Task } from '@/lib/types';

describe('TaskRow', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    status: 'todo',
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

  it('renders task details', () => {
    render(
      <table>
        <tbody>
          <TaskRow task={mockTask} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    // CSS capitalize is visual only — DOM text is lowercase
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });
});
