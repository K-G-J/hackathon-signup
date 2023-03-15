import { ChangeEvent, ReactElement, useState } from 'react'
import Link from 'next/link'

export default function signup(): ReactElement {
  const [role, setRole] = useState<'hacker' | 'partner' | 'mentor'>('hacker')

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === 'hacker') {
      setRole(e.target.value)
    }
    if (e.target.value === 'partner') {
      setRole(e.target.value)
    }
    if (e.target.value === 'mentor') {
      setRole(e.target.value)
    }
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <h1 className="mb-3 block text-base font-medium text-xl text-[#07074D]">
          Signup for:
        </h1>
        <div className="flex">
          <div className="flex items-center m-10">
            <input
              type="radio"
              name="role"
              value="hacker"
              id="hacker"
              checked={role === 'hacker'}
              onChange={onOptionChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="hacker"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
            >
              Hacker
            </label>
          </div>
          <div className="flex items-center mr-4">
            <input
              type="radio"
              name="role"
              value="partner"
              id="partner"
              checked={role === 'partner'}
              onChange={onOptionChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="partner"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
            >
              Partner
            </label>
          </div>
          <div className="flex items-center mr-4">
            <input
              type="radio"
              name="role"
              value="mentor"
              id="mentor"
              checked={role === 'mentor'}
              onChange={onOptionChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="mentor"
              className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-500"
            >
              Mentor
            </label>
          </div>
        </div>
        <div className="flex items-center m-10 ml-[8rem]">
          <Link href={`/${role}-form`}>
            <button
              type="button"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
