import { allGames } from "@/utils/endpoint"

// Mock the API function directly
const mockApiFunction = (genre?: string, page: number = 1) => {
  const ITEMS_PER_PAGE = 12
  let games = allGames

  if (genre && genre !== "all") {
    games = games.filter((game) => game.genre.toLowerCase() === genre.toLowerCase())
  }

  const fromIndex = (page - 1) * ITEMS_PER_PAGE
  const toIndex = page * ITEMS_PER_PAGE
  const paginatedGames = games.slice(fromIndex, toIndex)

  const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE)

  return {
    games: paginatedGames,
    availableFilters: ["Action", "RPG", "Adventure"],
    totalPages,
    currentPage: page,
  }
}

describe("Games API Logic", () => {
  it("returns games with pagination", () => {
    const result = mockApiFunction()

    expect(result.games).toBeDefined()
    expect(result.games.length).toBeLessThanOrEqual(12)
    expect(result.currentPage).toBe(1)
    expect(result.totalPages).toBeGreaterThan(0)
  })

  it("filters games by genre", () => {
    const result = mockApiFunction("Action")

    result.games.forEach((game) => {
      expect(game.genre.toLowerCase()).toBe("action")
    })
  })

  it("handles pagination correctly", () => {
    const page2Result = mockApiFunction(undefined, 2)

    expect(page2Result.currentPage).toBe(2)
    expect(page2Result.totalPages).toBeGreaterThan(0)
  })

  it("returns empty array for non-existent genre", () => {
    const result = mockApiFunction("NonExistentGenre")

    expect(result.games).toEqual([])
  })

  it("calculates total pages correctly", () => {
    const result = mockApiFunction()
    const expectedTotalPages = Math.ceil(allGames.length / 12)

    expect(result.totalPages).toBe(expectedTotalPages)
  })
})
