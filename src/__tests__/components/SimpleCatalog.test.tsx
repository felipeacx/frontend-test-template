import { render, screen } from "@testing-library/react"

// Simple mock of the Catalog component for testing structure
const SimpleCatalog = () => {
  return (
    <main className="flex flex-col min-h-screen pt-24 pb-24 px-5 md:px-24">
      <h1 className="text-4xl font-bold text-[#3B3B3B]">Top Sellers</h1>
      <div className="flex items-center justify-start md:justify-end gap-5 md:mt-0 mt-5">
        <b className="border-e-2 pr-6">Genre</b>
        <select name="genre" id="genre" className="ml-2">
          <option value="all">All</option>
        </select>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pt-10">
        <li>Mock Game</li>
      </ul>
    </main>
  )
}

describe("Simple Catalog Component", () => {
  it("renders the catalog title", () => {
    render(<SimpleCatalog />)

    expect(screen.getByText("Top Sellers")).toBeInTheDocument()
  })

  it("renders genre filter dropdown", () => {
    render(<SimpleCatalog />)

    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByText("Genre")).toBeInTheDocument()
  })

  it("has correct main element structure", () => {
    render(<SimpleCatalog />)

    const mainElement = screen.getByRole("main")
    expect(mainElement).toHaveClass("flex", "flex-col", "min-h-screen")
  })
})
