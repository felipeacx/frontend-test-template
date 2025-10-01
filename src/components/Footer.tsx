import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-10 bg-[#404040] flex justify-center items-center p-8">
      <Link href="/">
        <Image src="/logo/company.svg" alt="Company Logo" width={120} height={40} />
      </Link>
    </footer>
  )
}

export default Footer
