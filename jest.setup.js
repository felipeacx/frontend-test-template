import "@testing-library/jest-dom"

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return "/"
  },
}))

// Mock Next.js Link component
jest.mock("next/link", () => {
  const MockedLink = ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
  MockedLink.displayName = "Link"
  return MockedLink
})

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

// Global test utilities
global.fetch = jest.fn()

// Mock Request and Response for API testing
global.Request = jest.fn().mockImplementation((url, options) => ({
  url,
  method: options?.method || "GET",
  headers: options?.headers || {},
}))

global.Response = {
  json: (data) => ({
    json: () => Promise.resolve(data),
    status: 200,
    ok: true,
  }),
}

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})
