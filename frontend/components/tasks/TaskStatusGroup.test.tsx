import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskStatusGroup from './TaskStatusGroup';

describe('TaskStatusGroup', () => {
  it('renders group header and count', () => {
    render(
      <TaskStatusGroup title="To Do" count={3} isOpenByDefault={true}>
        <div>Task Content</div>
      </TaskStatusGroup>
    );
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Task Content')).toBeInTheDocument();
  });

  it('toggles content visibility', () => {
    render(
      <TaskStatusGroup title="To Do" count={3} isOpenByDefault={true}>
        <div>Task Content</div>
      </TaskStatusGroup>
    );
    
    expect(screen.getByText('Task Content')).toBeVisible();
    fireEvent.click(screen.getByText('To Do'));
    // Since it unmounts or hides, we can check for absence or visibility
    // If it unmounts conditionally:
    expect(screen.queryByText('Task Content')).not.toBeInTheDocument();
  });
});
