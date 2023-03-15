import Link from 'next/link'
import React from 'react'

function Footer(): JSX.Element {
  return (
    <div className="inset-x-0 bottom-0 overflow-auto">
      <footer className="w-screen p-4 bg-white rounded-lg shadow md:items-center md:justify-between dark:bg-gray-800 w-100">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <Link
            href="https://ethglobal.com/"
            className="hover:underline"
            target="_blank"
          >
            ETHGlobal
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
          <li>
            <Link
              href="https://ethglobal.com/about"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
              target="_blank"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="https://ethglobal.com/rules"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
              target="_blank"
            >
              Rules & Code of Conduct
            </Link>
          </li>
          <li>
            <Link
              href="https://ethglobal.com/privacy"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
