import { ADDHACKER } from '@/lib/mutations'
import { useLazyQuery, useMutation } from '@apollo/client'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import {
  validateEmail,
  validateGithub,
  validateLength,
  validateLinkedIn,
} from '../lib/dataValidation'
import { IHacker } from '@/context/context'
import { useRouter } from 'next/navigation'
import { GETHACKER } from '@/lib/queries'
import { useGlobalContext } from '@/context'

export interface IHackerInput {
  firstName: string
  lastName: string
  email: string
  website?: string
  github?: string
  linkedIn?: string
  yearsOfSoftwareExperience: number
  ethExperienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
  motivation:
    | 'ATTENDWORKSHOPS'
    | 'RESUMEBUILD'
    | 'GETBETTER'
    | 'MEETCOMPANIES'
    | 'MEETPEOPLE'
    | 'LAUNCHPRODUCT'
    | 'WINPRIZE'
    | 'OTHER'
  priorBuilds?: string
  lookingToBuild?: string
  rulesAccepted: boolean
}

export interface IHackerFormError {
  type:
    | ''
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'github'
    | 'linkedIn'
    | 'priorBuilds'
    | 'lookingToBuild'
    | 'rulesAccepted'
  message: string
}

export default function hackerForm(): ReactElement {
  const [form, setForm] = useState<IHackerInput>({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    github: '',
    linkedIn: '',
    yearsOfSoftwareExperience: 0,
    ethExperienceLevel: 'BEGINNER',
    motivation: 'ATTENDWORKSHOPS',
    priorBuilds: '',
    lookingToBuild: '',
    rulesAccepted: false,
  })
  const [error, setError] = useState<IHackerFormError>({
    type: '',
    message: '',
  })
  const [priorBuildsCount, setPriorBuildsCount] = useState<number>(0)
  const [lookingToBuildCount, setLookingToBuildCount] = useState<number>(0)
  const [addHacker, { data, error: addHackerError }] = useMutation<IHacker>(
    ADDHACKER,
  )
  const [fetchHacker, { data: hackerData }] = useLazyQuery<IHacker>(GETHACKER)
  const { setHacker } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    if (!addHackerError) {
      fetchHacker({ variables: { email: form.email } })
      if (hackerData?.getHacker != null) {
        setHacker(hackerData.getHacker)
        router.replace('/success')
      }
    }
  }, [data])

  const handleETHExperienceSelect = (
    e: ChangeEvent<HTMLSelectElement>,
  ): void => {
    if (
      e.target.value === 'BEGINNER' ||
      e.target.value === 'INTERMEDIATE' ||
      e.target.value === 'EXPERT'
    ) {
      setForm({ ...form, ethExperienceLevel: e.target.value })
    }
  }

  const handleMotivationSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (
      e.target.value === 'ATTENDWORKSHOPS' ||
      e.target.value === 'RESUMEBUILD' ||
      e.target.value === 'GETBETTER' ||
      e.target.value === 'MEETCOMPANIES' ||
      e.target.value === 'MEETPEOPLE' ||
      e.target.value === 'LAUNCHPRODUCT' ||
      e.target.value === 'WINPRIZE' ||
      e.target.value === 'OTHER'
    ) {
      setForm({ ...form, motivation: e.target.value })
    }
  }

  const handlePriorBuildsInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPriorBuildsCount(e.target.value.length)
    setForm({ ...form, priorBuilds: e.target.value })
  }

  const handleLookingToBuildInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLookingToBuildCount(e.target.value.length)
    setForm({ ...form, lookingToBuild: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.firstName) {
      setError({ type: 'firstName', message: 'please enter your first name' })
      return
    }
    if (!form.lastName) {
      setError({ type: 'lastName', message: 'please enter your last name' })
      return
    }
    if (!form.email || !validateEmail(form.email)) {
      setError({ type: 'email', message: 'please enter a valid email address' })
      return
    }
    if (form.github && !validateGithub(form.github)) {
      setError({
        type: 'github',
        message: 'please enter a valid github profile url',
      })
      return
    }
    if (form.linkedIn && !validateLinkedIn(form.linkedIn)) {
      setError({
        type: 'linkedIn',
        message: 'please enter a valid LinkedIn profile url',
      })
      return
    }
    if (form.priorBuilds && !validateLength(form.priorBuilds)) {
      setError({
        type: 'priorBuilds',
        message: 'please stay within the character range',
      })
      return
    }
    if (form.lookingToBuild && !validateLength(form.lookingToBuild)) {
      setError({
        type: 'lookingToBuild',
        message: 'please stay within the character range',
      })
      return
    }
    if (!form.rulesAccepted) {
      setError({
        type: 'rulesAccepted',
        message: 'please accept the rules and code of conduct',
      })
      return
    }
    await addHacker({ variables: { input: { ...form } } })
    if (!addHackerError) {
      await fetchHacker({ variables: { email: form.email } })
      if (hackerData) {
        setHacker(hackerData.getHacker)
        router.replace('/success')
      }
    }
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form>
          <div className="-mx-3 flex flex-wrap">
            {addHackerError && (
              <p className="mb-5 text-red-500">
                Something went wrong, please try again
              </p>
            )}
            {/* firstName */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="fName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  First Name
                </label>
                {error.type === 'firstName' && (
                  <p className="mb-5 text-red-500">{error.message}</p>
                )}
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  placeholder="First Name"
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            {/* lastName */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="lName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Last Name
                </label>
                {error.type === 'lastName' && (
                  <p className="mb-5 text-red-500">{error.message}</p>
                )}
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            {/* email */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                {error.type === 'email' && (
                  <p className="mb-5 text-red-500">{error.message}</p>
                )}
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="example@domain.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            {/* website */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="website"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  website
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  placeholder="https://yourwebsite.com"
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            {/* github */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="github"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  GitHub
                </label>
                {error.type === 'github' && (
                  <p className="mb-5 text-red-500">{error.message}</p>
                )}
                <input
                  type="text"
                  name="github"
                  id="github"
                  placeholder="https://github.com/yourusername"
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            {/* linkedIn */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="linkedIn"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  LinkedIn
                </label>
                {error.type === 'linkedIn' && (
                  <p className="mb-5 text-red-500">{error.message}</p>
                )}
                <input
                  type="text"
                  name="linkedIn"
                  id="linkedIn"
                  placeholder="https://www.linkedin.com/in/yourname"
                  onChange={(e) =>
                    setForm({ ...form, linkedIn: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            {/* yearsOfSoftwareExperience*/}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="yearsOfSoftwareExperience"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  How many years of experience do you have with sofware
                  development?
                </label>
                <input
                  type="number"
                  name="yearsOfSoftwareExperience"
                  id="yearsOfSoftwareExperience"
                  placeholder="0"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      yearsOfSoftwareExperience: parseInt(e.target.value),
                    })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            {/* ethExperienceLevel */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="ethExperienceLevel"
                  className="mb-10 block text-base font-medium text-[#07074D]"
                >
                  What's your experience level with Ethereum?
                </label>
                <select
                  id="ethExperienceLevel"
                  onChange={handleETHExperienceSelect}
                  className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="BEGINNER">beginner</option>
                  <option value="INTERMEDIATE">intermediate</option>
                  <option value="EXPERT">expert</option>
                </select>
              </div>
            </div>
          </div>

          {/* motivation */}
          <label
            htmlFor="motivation"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            What is your motivation to join this event?
          </label>
          <select
            id="motivation"
            onChange={handleMotivationSelect}
            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="ATTENDWORKSHOPS">
              Attend workshops & tech talks
            </option>
            <option value="RESUMEBUILD">
              Build something to put on my resume / portfolio
            </option>
            <option value="GETBETTER">
              Get better as a developer / designer
            </option>
            <option value="MEETCOMPANIES">
              Meet companies for a potential job opportunity
            </option>
            <option value="MEETPEOPLE">
              Meet like-minded people and make friends
            </option>
            <option value="LAUNCHPRODUCT">Launch a product</option>
            <option value="WINPRIZE">Win a prize</option>
            <option value="OTHER">Other</option>
          </select>

          {/* priorBuilds */}
          <div className="mb-5">
            <label
              htmlFor="priorBuilds"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Tell us about what you've built before?
            </label>
            <p className="mb-3 text-[#6B7280]">250-500 characters</p>
            {error.type === 'priorBuilds' && (
              <p className="mb-5 text-red-500">{error.message}</p>
            )}
            <textarea
              name="priorBuilds"
              id="priorBuilds"
              placeholder="I built a decentralized application that . . ."
              onChange={handlePriorBuildsInput}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <p className="text-[#6B7280]">{priorBuildsCount}</p>
          </div>

          {/* lookingToBuild */}
          <div className="mb-5">
            <label
              htmlFor="lookingToBuild"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Tell us about what are you looking to build at this hackathon?
            </label>
            <p className="mb-3 text-[#6B7280]">250-500 characters</p>
            {error.type === 'lookingToBuild' && (
              <p className="mb-5 text-red-500">{error.message}</p>
            )}
            <textarea
              name="lookingToBuild"
              id="lookingToBuild"
              placeholder="For this hackathon I am looking to build a . . ."
              onChange={handleLookingToBuildInput}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <p className="text-[#6B7280]">{lookingToBuildCount}</p>
          </div>

          {/* rulesAccepted */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Do you accept the rules and code of conduct for the event?
            </label>
            <div className="flex items-center space-x-6">
              {error.type === 'rulesAccepted' && (
                <p className="mb-5 text-red-500">{error.message}</p>
              )}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rulesAccepted"
                  id="rulesAccepted"
                  checked={form.rulesAccepted}
                  onChange={() =>
                    setForm({ ...form, rulesAccepted: !form.rulesAccepted })
                  }
                  className="h-5 w-5"
                />
                <label
                  htmlFor="rulesAccepted"
                  className="pl-3 text-base font-medium text-[#07074D]"
                >
                  Yes
                </label>
              </div>
            </div>
          </div>

          {/* Submit Form Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
