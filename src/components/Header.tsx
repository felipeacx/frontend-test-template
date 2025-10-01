import Link from "next/link"
import { BsCart3 } from "react-icons/bs"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center bg-[#EEEEEE] h-16 px-16">
        <h1 className="text-2xl font-bold text-[#585660]">GamerShop</h1>
        <nav>
          <Link href="/cart">
            <BsCart3 className="text-2xl" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
