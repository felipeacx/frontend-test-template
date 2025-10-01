import { allGames, availableFilters, delay, Game } from "@/utils/endpoint"

describe("Endpoint Utils", () => {
  describe("allGames", () => {
    it("should contain an array of games", () => {
      expect(Array.isArray(allGames)).toBe(true)
      expect(allGames.length).toBeGreaterThan(0)
    })

    it("should have games with required properties", () => {
      const game = allGames[0]
      expect(game).toHaveProperty("id")
      expect(game).toHaveProperty("genre")
      expect(game).toHaveProperty("image")
      expect(game).toHaveProperty("name")
      expect(game).toHaveProperty("description")
      expect(game).toHaveProperty("price")
      expect(game).toHaveProperty("isNew")
    })

    it("should have valid game data types", () => {
      allGames.forEach((game: Game) => {
        expect(typeof game.id).toBe("string")
        expect(typeof game.genre).toBe("string")
        expect(typeof game.image).toBe("string")
        expect(typeof game.name).toBe("string")
        expect(typeof game.description).toBe("string")
        expect(typeof game.price).toBe("number")
        expect(typeof game.isNew).toBe("boolean")
      })
    })

    it("should have positive prices", () => {
      allGames.forEach((game: Game) => {
        expect(game.price).toBeGreaterThan(0)
      })
    })

    it("should have unique IDs", () => {
      const ids = allGames.map((game) => game.id)
      const uniqueIds = Array.from(new Set(ids))
      expect(ids.length).toBe(uniqueIds.length)
    })
  })

  describe("availableFilters", () => {
    it("should contain an array of filters", () => {
      expect(Array.isArray(availableFilters)).toBe(true)
      expect(availableFilters.length).toBeGreaterThan(0)
    })

    it("should contain unique genres from games", () => {
      const gameGenres = Array.from(new Set(allGames.map((game) => game.genre)))
      availableFilters.forEach((filter) => {
        expect(gameGenres).toContain(filter)
      })
    })
  })

  describe("delay function", () => {
    jest.setTimeout(10000) // Increase timeout for delay tests

    it("should delay execution for specified time", async () => {
      const startTime = Date.now()
      await delay(100) // 100ms delay
      const endTime = Date.now()
      const timeDiff = endTime - startTime

      // Allow some margin for timing variations
      expect(timeDiff).toBeGreaterThanOrEqual(90)
      expect(timeDiff).toBeLessThan(200)
    })

    it("should resolve without value", async () => {
      const result = await delay(10)
      expect(result).toBeUndefined()
    })
  })
})
