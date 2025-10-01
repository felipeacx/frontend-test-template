import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { Game } from '@/utils/endpoint'

// Custom render function with common providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, options)
}

// Mock game data for testing
export const mockGame: Game = {
  id: 'test-1',
  genre: 'Action',
  image: '/game-images/test.jpeg',
  name: 'Test Game',
  description: 'A test game for unit testing',
  price: 49.99,
  isNew: true,
}

export const mockGames: Game[] = [
  mockGame,
  {
    id: 'test-2',
    genre: 'RPG',
    image: '/game-images/test2.jpeg',
    name: 'Test RPG Game',
    description: 'An RPG test game',
    price: 39.99,
    isNew: false,
  },
  {
    id: 'test-3',
    genre: 'Adventure',
    image: '/game-images/test3.jpeg',
    name: 'Test Adventure Game',
    description: 'An adventure test game',
    price: 29.99,
    isNew: true,
  },
]

// Mock localStorage for testing
export const createMockLocalStorage = () => {
  const store: Record<string, string> = {}
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    get store() {
      return { ...store }
    },
  }
}

// Helper to mock API responses
export const createMockApiResponse = (data: any) => ({
  json: jest.fn().mockResolvedValue(data),
  status: 200,
  ok: true,
})

// Helper to wait for async operations
export const waitForAsync = () => 
  new Promise(resolve => setTimeout(resolve, 0))

// Re-export everything from testing-library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'