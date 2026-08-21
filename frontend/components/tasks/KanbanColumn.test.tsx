import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KanbanColumn from './KanbanColumn';

describe('KanbanColumn', () => {
  it('renders column header and content', () => {
    render(
      <KanbanColumn title="To Do" count={3}>
        <div>Card 1</div>
      </KanbanColumn>
    );
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });
});
