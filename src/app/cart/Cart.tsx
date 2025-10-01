"use client"

import { Game } from "@/utils/endpoint"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Cart = () => {
  const [cart, setCart] = useState<Game[]>([])

  const getCart = () => {
    const cart: Game[] = JSON.parse(window.localStorage.getItem("cart") || "[]")
    setCart(cart)
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <main className="flex flex-col pt-24 pb-24 px-5 md:px-24">
      <Link className="" href="/">
        ← Back to Catalog
      </Link>
      <h1 className="text-4xl font-bold mt-10">Your Cart</h1>
      <p className="mb-10">{cart.length} items</p>
      <div className="grid grid-cols-2 gap-10">
        <ul className="md:col-span-1 col-span-2">
          {cart.map((item: Game) => (
            <li key={item.id} className="flex p-3">
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="w-full h-[150px] object-cover"
              />
              <div className="px-5">
                <p className="text-[#737373] font-bold">{item.genre}</p>
                <p className="text-[#3B3B3B] font-bold">{item.name}</p>
                <p className="text-[#737373]">{item.description}</p>
                <p className="text-xl font-bold float-end">${item.price}</p>
              </div>
              <p
                className="cursor-pointer relative top-0 right-0 text-[#8F8F8F]"
                onClick={() => {
                  const updatedCart = cart.filter((i) => i.id !== item.id)
                  window.localStorage.setItem("cart", JSON.stringify(updatedCart))
                  getCart()
                }}
              >
                x
              </p>
            </li>
          ))}
        </ul>
        <div className="md:col-span-1 col-span-2">
          <div className="border-2 rounded-2xl p-5">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <p className="text-lg mb-8">{cart.length} items</p>
            {cart.length > 0 &&
              cart.map((item: Game) => (
                <div className="flex justify-between items-center" key={item.id}>
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                </div>
              ))}
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Order Total</p>
              <p className="text-xl font-bold">
                ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="mt-5 w-full text-white bg-[#585660] p-5 rounded-lg font-bold"
            onClick={() => alert("Your order has been placed!")}
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  )
}

export default Cart
