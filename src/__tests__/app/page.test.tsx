import { render, screen } from "@testing-library/react"
import Home from "@/app/page"

// Mock the child components
jest.mock("@/components/Header", () => {
  const MockHeader = () => <header data-testid="header">Header</header>
  MockHeader.displayName = "Header"
  return MockHeader
})

jest.mock("@/components/Footer", () => {
  const MockFooter = () => <footer data-testid="footer">Footer</footer>
  MockFooter.displayName = "Footer"
  return MockFooter
})

jest.mock("@/app/catalog/Catalog", () => {
  const MockCatalog = () => <main data-testid="catalog">Catalog</main>
  MockCatalog.displayName = "Catalog"
  return MockCatalog
})

describe("Home Page", () => {
  it("renders all main components", async () => {
    render(await Home())

    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("catalog")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })

  it("renders components in correct order", async () => {
    const { container } = render(await Home())

    const children = Array.from(container.children)
    expect(children).toHaveLength(3)

    // Check the order of components
    expect(children[0]).toHaveAttribute("data-testid", "header")
    expect(children[1]).toHaveAttribute("data-testid", "catalog")
    expect(children[2]).toHaveAttribute("data-testid", "footer")
  })
})
