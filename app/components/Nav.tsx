"use client"

import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { motion, AnimatePresence } from "framer-motion"
import DarkLight from "./DarkLight"
import { useSession } from "next-auth/react"
import formatPrice from "@/util/PriceFormat"
import { Tooltip } from "@mui/material"
import { BsFire } from "react-icons/bs"
import { useEffect, useState } from "react"
import useSound from "use-sound"
import DropDown from "./Dropdown"
import Plonk from "./sound/plonk"
import calculateCurrentStreak from "@/util/getStreak"

export default function Nav() {
  const cartStore = useCartStore()
  const { data: session, status } = useSession()

  const [currentStreak, setCurrentStreak] = useState(null)

  // console.log(session)

  // useEffect(() => {
  //   setCurrentStreak(session?.user.currentStreak)
  // }, [session])

  return (
    <div className="px-4 fixed opacity-95 left-0 top-0 w-full navbar bg-base-300 mb-4 hover:bg-base-300  shadow-md shadow-black/30 z-50">
      <Link href={"/"} className="flex-1">
        <h1 className="btn btn-ghost normal-case text-lg lg:text-xl rounded-full">
          Zephyr
        </h1>
      </Link>
      <div className="flex-none gap-4">
        {session?.user && (
          <div className="-mt-4">
            <div className="bg-red-500 rounded-full h-4 w-4 shadow-xl top-2 left-4 relative flex justify-center items-center">
              <p className="text-white font-semibold text-sm">
                {session?.user.currentStreak}
              </p>
            </div>

            <BsFire size={30} />
          </div>
        )}
        {/* {Dark Mode} */}
        <DarkLight />
        {/* <Plonk /> */}
        {/* <Tooltip title="View your cart" arrow>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartStore.cart.length > 0 && (
                  <motion.span
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    exit={{ scale: 0 }}
                  >
                    <motion.span className="badge badge-sm indicator-item bg-secondary text-white z-0">
                      {cartStore.cart.length}
                    </motion.span>
                  </motion.span>
                )}
              </div>
            </label>

            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-300 shadow border-gray-600 border"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cartStore.cart.length} Items
                </span>
                <span className="text-info">
                  Subtotal: {formatPrice(totalPrice)}
                </span>

                <div className="card-actions">
                  <button
                    onClick={() => cartStore.toggleCart()}
                    className="btn btn-outline btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Tooltip> */}

        {/* If the user is not signed in */}
        {!session?.user && (
          <li className="btn btn-ghost bg-primary text-white font-medium py-2 px-4 rounded-full">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}

        {/* <DropDown /> */}

        {/* User is signed in */}
        {session?.user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 lg:w-12 rounded-full">
                <Image
                  src={session.user?.image as string}
                  alt={session.user.name as string}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-blue-400"
                  tabIndex={0}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg  bg-base-300 rounded-box w-48 md:w-64 lg:w-64 border-gray-600 border"
            >
              <li>
                <Link
                  href={"/exerciseHistory"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  History
                </Link>
              </li>

              <li>
                <Link href={"/profile"}>
                  <h3 className="justify-between">
                    Profile
                    <span className="badge mx-2 ">New</span>
                  </h3>
                </Link>
              </li>

              <li>
                <Link href={"/leaderboard"}>
                  <h3 className="justify-between">
                    Leaderboard
                    <span className="badge mx-2 ">New</span>
                  </h3>
                </Link>
              </li>
              <li
                className="hover:bg-red-500/40 rounded-full"
                onClick={() => {
                  signOut()
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur()
                  }
                }}
              >
                <h3>Sign out</h3>
              </li>
            </ul>
          </div>
        )}
      </div>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </div>
  )
}
