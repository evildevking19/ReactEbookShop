import { useEffect, useState } from "react"
import { useCart } from "../../context"
import { Link } from "react-router-dom"
import { Search } from "../Sections/Search"
import { DropdownLoggedIn, DropdownLoggedOut } from "../index"
import Logo from "../../assets/logo.png"

export const Header = () => {
  const { cartList } = useCart()
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false)
  const [isSearchShow, setSearchShow] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const token = JSON.parse(sessionStorage.getItem("token"))

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <header>
      <nav className="bg-white dark:bg-gray-900">
        <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-10" alt="CodeBook Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
          </Link>
          <div className="flex items-center relative">
            <span className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected" onClick={() => setDarkMode(!darkMode)}></span>
            <span className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search" onClick={() => setSearchShow(!isSearchShow)}></span>
            <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
              <span className="text-2xl bi bi-cart-fill relative">
                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length}</span>
              </span>
            </Link>
            <span className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white" onClick={() => setDropdownOpen(!isDropdownOpen)}></span>
            {isDropdownOpen && (token ? <DropdownLoggedIn setDropdownOpen={setDropdownOpen} /> : <DropdownLoggedOut setDropdownOpen={setDropdownOpen} />)}
          </div>
        </div>
      </nav>
      {isSearchShow && <Search setSearchShow={setSearchShow} />}
    </header>
  )
}
