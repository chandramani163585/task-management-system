import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders value', () => {
    render(<Badge value="Urgent" variant="priority" />)
    expect(screen.getByText('Urgent')).toBeDefined()
  })
})
