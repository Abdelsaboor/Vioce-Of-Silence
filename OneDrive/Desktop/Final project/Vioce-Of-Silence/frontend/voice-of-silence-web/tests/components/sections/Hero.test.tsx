// path: tests/components/sections/Hero.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

// Mock the 3D components
jest.mock('@/components/3d/Scene', () => {
  return function MockScene() {
    return <div data-testid="3d-scene">3D Scene</div>
  }
})

// Mock speech synthesis
global.window.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  getVoices: jest.fn().mockReturnValue([]),
} as unknown as SpeechSynthesis

// Mock fetch
global.fetch = jest.fn()

describe('Hero Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear()
  })

  it('should render hero section', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Voice of Silence/i)).toBeInTheDocument()
  })

  it('should render 3D scene', async () => {
    render(<Hero />)
    
    await waitFor(() => {
      expect(screen.getByTestId('3d-scene')).toBeInTheDocument()
    })
  })

  it('should have accessible elements', () => {
    render(<Hero />)
    
    const section = screen.getByLabelText('Hero section')
    expect(section).toBeInTheDocument()
  })

  it('should render CTA buttons', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument()
    expect(screen.getByText(/Try Demo/i)).toBeInTheDocument()
  })
})

