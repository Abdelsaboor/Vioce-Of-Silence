// path: __tests__/components/Hero.test.tsx
import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  }
}))

// Mock dynamic import
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => <div>Mocked Scene</div>
}))

describe('Hero Component', () => {
  it('renders hero title', () => {
    render(<Hero />)
    expect(screen.getByText('Voice of Silence')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByLabelText('Try demo')).toBeInTheDocument()
    expect(screen.getByLabelText('Learn more about the project')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<Hero />)
    expect(screen.getByText(/Transforming sign language into speech/i)).toBeInTheDocument()
  })
})