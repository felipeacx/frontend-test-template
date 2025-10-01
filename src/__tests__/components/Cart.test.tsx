import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Cart from "@/app/cart/Cart"
import { Game } from "@/utils/endpoint"

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Mock window.alert
window.alert = jest.fn()

describe("Cart Component", () => {
  const mockCartItems: Game[] = [
    {
      id: "1",
      genre: "Action",
      image: "/game-images/cyberpunk2077.jpeg",
      name: "Cyberpunk 2077",
      description: "An open-world, action-adventure story set in Night City.",
      price: 59.99,
      isNew: true,
    },
    {
      id: "2",
      genre: "RPG",
      image: "/game-images/thewitcher3.jpeg",
      name: "The Witcher 3: Wild Hunt",
      description: "A story-driven, next-generation open world role-playing game.",
      price: 39.99,
      isNew: false,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue("[]")
  })

  it("renders cart title and back link", () => {
    render(<Cart />)

    expect(screen.getByText("Your Cart")).toBeInTheDocument()
    expect(screen.getByText("← Back to Catalog")).toBeInTheDocument()
  })

  it("displays empty cart initially", () => {
    render(<Cart />)

    expect(screen.getAllByText("0 items")).toHaveLength(2) // One in header, one in summary
  })

  it("displays cart items from localStorage", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCartItems))

    render(<Cart />)

    expect(screen.getAllByText("2 items")).toHaveLength(2) // One in header, one in summary
    expect(screen.getAllByText("Cyberpunk 2077")).toHaveLength(2) // One in cart list, one in summary
    expect(screen.getAllByText("The Witcher 3: Wild Hunt")).toHaveLength(2) // One in cart list, one in summary
  })

  it("displays game details correctly", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCartItems))

    render(<Cart />)

    const firstGame = mockCartItems[0]
    expect(screen.getByText(firstGame.genre)).toBeInTheDocument()
    expect(screen.getAllByText(firstGame.name)).toHaveLength(2) // One in cart list, one in summary
    expect(screen.getByText(firstGame.description)).toBeInTheDocument()
    expect(screen.getByText(`$${firstGame.price}`)).toBeInTheDocument()
  })

  it("calculates order total correctly", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCartItems))

    render(<Cart />)

    const expectedTotal = mockCartItems.reduce((total, item) => total + item.price, 0)
    expect(screen.getByText(`$${expectedTotal.toFixed(2)}`)).toBeInTheDocument()
  })

  it("removes item from cart when x is clicked", async () => {
    const user = userEvent.setup()
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCartItems))

    render(<Cart />)

    const removeButtons = screen.getAllByText("x")
    await user.click(removeButtons[0])

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([mockCartItems[1]]) // Should remove first item
    )
  })

  it("displays checkout button", () => {
    render(<Cart />)

    expect(screen.getByText("Checkout")).toBeInTheDocument()
  })

  it("shows alert when checkout is clicked", async () => {
    const user = userEvent.setup()
    render(<Cart />)

    const checkoutButton = screen.getByText("Checkout")
    await user.click(checkoutButton)

    expect(window.alert).toHaveBeenCalledWith("Your order has been placed!")
  })

  it("displays order summary with correct item count", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCartItems))

    render(<Cart />)

    expect(screen.getByText("Order Summary")).toBeInTheDocument()

    // Should show item count in both places
    const itemCountElements = screen.getAllByText("2 items")
    expect(itemCountElements).toHaveLength(2)
  })

  it("displays individual item prices in order summary", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCartItems))

    render(<Cart />)

    mockCartItems.forEach((item) => {
      expect(screen.getByText(`$ ${item.price}`)).toBeInTheDocument()
    })
  })

  it("back to catalog link has correct href", () => {
    render(<Cart />)

    const backLink = screen.getByText("← Back to Catalog")
    expect(backLink.closest("a")).toHaveAttribute("href", "/")
  })

  it("handles empty cart gracefully", () => {
    localStorageMock.getItem.mockReturnValue("[]")

    render(<Cart />)

    expect(screen.getAllByText("0 items")).toHaveLength(2) // One in header, one in summary
    expect(screen.getByText("$0.00")).toBeInTheDocument()
  })

  it("handles malformed localStorage data", () => {
    localStorageMock.getItem.mockReturnValue("invalid json")

    // Should not crash and fallback to empty array
    render(<Cart />)

    expect(screen.getAllByText("0 items")).toHaveLength(2) // One in header, one in summary
  })
})
