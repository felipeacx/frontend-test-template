import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Catalog from "./catalog/Catalog"

export default async function Home() {
  return (
    <>
      <Header />
      <Catalog />
      <Footer />
    </>
  )
}
