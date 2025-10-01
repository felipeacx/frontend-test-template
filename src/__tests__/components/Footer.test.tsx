import { render, screen } from "@testing-library/react"
import Footer from "@/components/Footer"

describe("Footer Component", () => {
  it("renders the footer element", () => {
    render(<Footer />)

    const footer = screen.getByRole("contentinfo")
    expect(footer).toBeInTheDocument()
  })

  it("displays the company logo", () => {
    render(<Footer />)

    const logo = screen.getByAltText("Company Logo")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src", "/logo/company.svg")
    expect(logo).toHaveAttribute("width", "120")
    expect(logo).toHaveAttribute("height", "40")
  })

  it("logo links to home page", () => {
    render(<Footer />)

    const homeLink = screen.getByRole("link")
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute("href", "/")
  })

  it("has correct styling classes", () => {
    render(<Footer />)

    const footer = screen.getByRole("contentinfo")
    expect(footer).toHaveClass(
      "fixed",
      "bottom-0",
      "left-0",
      "w-full",
      "z-10",
      "bg-[#404040]",
      "flex",
      "justify-center",
      "items-center",
      "p-8"
    )
  })
})
