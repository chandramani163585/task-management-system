import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './page';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

vi.mock('@/lib/hooks/useAuth');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('LoginPage', () => {
  it('renders login form', () => {
    (useAuth as any).mockReturnValue({ login: vi.fn(), isLoading: false });
    render(<LoginPage />);
    
    expect(screen.getByText("Let's get back on track")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('calls login on submit', async () => {
    const mockLogin = vi.fn().mockResolvedValue({});
    const mockPush = vi.fn();
    (useAuth as any).mockReturnValue({ login: mockLogin, isLoading: false });
    (useRouter as any).mockReturnValue({ push: mockPush });

    render(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');
    // We would need to wrap in act/waitFor for the push, but this is a simple sync check for the mock call
  });
});
