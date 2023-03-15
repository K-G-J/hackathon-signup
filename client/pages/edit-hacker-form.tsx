import { UPDATEHACKER } from '@/lib/mutations'
import { useMutation } from '@apollo/client'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import {
  validateEmail,
  validateGithub,
  validateLength,
  validateLinkedIn,
} from '../lib/utils/dataValidation'
import { IHackerFormError, IHackerInput } from './hacker-form'
import { useGlobalContext } from '../context/index'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { styleApplicationStatus } from '@/lib/utils/helpers'

export default function editHackerForm(): ReactElement {
  const { hacker, setHacker } = useGlobalContext()
  const [form, setForm] = useState<IHackerInput>({
    firstName: hacker!.firstName,
    lastName: hacker!.lastName,
    email: hacker!.email,
    website: hacker!.website,
    github: hacker!.github,
    linkedIn: hacker!.linkedIn,
    yearsOfSoftwareExperience: hacker!.yearsOfSoftwareExperience,
    ethExperienceLevel: hacker!.ethExperienceLevel,
    motivation: hacker!.motivation,
    priorBuilds: hacker!.priorBuilds,
    lookingToBuild: hacker!.lookingToBuild,
    rulesAccepted: false,
  })
  const [error, setError] = useState<IHackerFormError>({
    type: '',
    message: '',
  })
  const [priorBuildsCount, setPriorBuildsCount] = useState<number>(
    hacker!.priorBuilds.length,
  )
  const [lookingToBuildCount, setLookingToBuildCount] = useState<number>(
    hacker!.lookingToBuild.length,
  )
  const [updateHacker, { data, error: updateHackerError }] = useMutation(
    UPDATEHACKER,
  )
  const router = useRouter()

  useEffect(() => {
    if (!updateHackerError) {
      if (data) {
        setHacker(data.updateHacker)
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

  const handlePriorBuildsInput = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setPriorBuildsCount(e.target.value.length)
    setForm({ ...form, priorBuilds: e.target.value })
  }

  const handleLookingToBuildInput = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setLookingToBuildCount(e.target.value.length)
    setForm({ ...form, lookingToBuild: e.target.value })
  }

  const handleUpdate = async (): Promise<void> => {
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
    await updateHacker({
      variables: {
        email: hacker!.email,
        input: {
          ...form,
        },
      },
    })
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <p className="mb-3 block text-base font-medium text-xl text-[#07074D]">
          You have already signed up to be a hacker
        </p>
        <p className="mb-3 block text-base font-medium text-xl text-[#07074D]">
          Your application status is{' '}
          <span className={styleApplicationStatus(hacker!.applicationStatus)}>
            {hacker!.applicationStatus}
          </span>
        </p>
        <p className="mb-3 block text-base font-medium text-l text-[#07074D]">
          You can edit your application below
        </p>
        <form>
          <div className="-mx-3 flex flex-wrap">
            {updateHackerError && (
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
                  defaultValue={hacker!.firstName}
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
                  defaultValue={hacker!.lastName}
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
                  defaultValue={hacker!.email}
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
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  defaultValue={hacker!.website}
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
                  defaultValue={hacker!.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                  defaultValue={hacker!.linkedIn}
                  onChange={(e) =>
                    setForm({ ...form, linkedIn: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[0.7rem] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                  How many years of experience do you have with software
                  development?
                </label>
                <input
                  type="number"
                  name="yearsOfSoftwareExperience"
                  id="yearsOfSoftwareExperience"
                  defaultValue={hacker!.yearsOfSoftwareExperience}
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
                  defaultValue={hacker!.ethExperienceLevel}
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
            defaultValue={hacker!.motivation}
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
              defaultValue={hacker!.priorBuilds}
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
              defaultValue={hacker!.lookingToBuild}
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
              onClick={handleUpdate}
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
