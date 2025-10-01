"use client"

import { Game } from "@/utils/endpoint"
import { useEffect, useState } from "react"
import { GET } from "../api/games/route"
import Image from "next/image"

export default function Catalog() {
  const [filterGenre, setFilterGenre] = useState<string>("all")
  const [page, setPage] = useState<number>(1)
  const [games, setGames] = useState<Game[]>([])
  const [availableFilters, setAvailableFilters] = useState<string[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<Game[]>([])

  const getData = async () => {
    setIsLoading(true)
    const genreParam = filterGenre === "all" ? "" : encodeURIComponent(filterGenre)
    const url = `/api/games?genre=${genreParam}&page=${page}`
    const request = new Request(url, { method: "GET" })
    const response = await GET(request)
    const data = await response.json()
    setGames(data.games ?? [])
    setAvailableFilters(data.availableFilters ?? ["all"])
    setTotalPages(data.totalPages ?? 1)
    setIsLoading(false)
  }

  const getCart = () => {
    const cart: Game[] = JSON.parse(window.localStorage.getItem("cart") || "[]")
    setCart(cart)
  }

  useEffect(() => {
    getData()
    getCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterGenre, page])

  const handleClickSeeMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const addToCart = (game: Game) => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]")
    cart.push(game)
    window.localStorage.setItem("cart", JSON.stringify(cart))
    window.alert(`${game.name} has been added to your cart!`)
    getData()
    getCart()
  }

  const removeFromCart = (game: Game) => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]")
    const updatedCart = cart.filter((item: Game) => item.id !== game.id)
    window.localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.alert(`${game.name} has been removed from your cart!`)
    getData()
    getCart()
  }

  return (
    <main className="flex flex-col min-h-screen pt-24 pb-24 px-24">
      <h1 className="text-4xl font-bold text-[#3B3B3B]">Top Sellers</h1>
      <div className="flex items-center justify-end gap-5">
        <b className="border-e-2 pr-6">Genre</b>
        <select
          name="genre"
          id="genre"
          className="ml-2"
          onChange={(e) => {
            setFilterGenre(e.target.value)
            setPage(1)
          }}
          value={filterGenre}
        >
          <option value="all">All</option>
          {availableFilters.map((filter) => (
            <option key={filter} value={filter.toLowerCase()}>
              {filter}
            </option>
          ))}
        </select>
      </div>
      <ul className="grid grid-cols-3 gap-10 pt-10">
        {isLoading ? (
          <li className="text-xl animate-bounce py-5">Loading...</li>
        ) : (
          games.map((game) => (
            <li className="flex flex-col border rounded-2xl p-4 w-full h-[436px]" key={game.id}>
              <Image
                src={game.image}
                alt={game.name}
                width={240}
                height={240}
                className="w-full h-[240px] rounded-t-2xl object-cover"
              />
              <span className="font-bold uppercase text-[#737373] py-3">{game.genre}</span>
              <div className="flex  justify-between items-center font-bold text-[#3B3B3B]">
                <p className="text-lg text-ellipsis overflow-hidden text-nowrap">{game.name}</p>
                <p className="text-xl">${game.price}</p>
              </div>
              <button
                className="border-2 p-5 rounded-2xl border-[#3B3B3B] uppercase font-bold mt-5"
                onClick={() =>
                  cart.find((item) => item.id === game.id) ? removeFromCart(game) : addToCart(game)
                }
              >
                {cart.find((item) => item.id === game.id) ? "Remove" : "Add to cart"}
              </button>
            </li>
          ))
        )}
      </ul>
      {page !== totalPages && (
        <div>
          <button
            className="px-5 py-3 bg-[#585660] text-white uppercase rounded mt-5"
            onClick={handleClickSeeMore}
          >
            See more
          </button>
        </div>
      )}
    </main>
  )
}
