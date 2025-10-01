import { render, screen } from "@testing-library/react"
import Header from "@/components/Header"

describe("Header Component", () => {
  it("renders the header with correct title", () => {
    render(<Header />)

    const title = screen.getByRole("heading", { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent("GamerShop")
  })

  it("renders the cart link", () => {
    render(<Header />)

    const cartLink =
      screen
        .getByRole("link", { name: /gamershop/i })
        .parentElement?.querySelector('a[href="/cart"]') ||
      screen.getAllByRole("link").find((link) => link.getAttribute("href") === "/cart")
    expect(cartLink).toBeInTheDocument()
  })

  it("renders the home link", () => {
    render(<Header />)

    const homeLink = screen.getByRole("link", { name: /gamershop/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute("href", "/")
  })

  it("has correct styling classes", () => {
    render(<Header />)

    const header = screen.getByRole("banner")
    expect(header).toHaveClass("fixed", "top-0", "left-0", "w-full", "z-10")
  })

  it("displays the cart icon", () => {
    render(<Header />)

    // Check if the cart link exists by href attribute
    const cartLinks = screen.getAllByRole("link")
    const cartLink = cartLinks.find((link) => link.getAttribute("href") === "/cart")
    expect(cartLink).toBeInTheDocument()
  })
})
