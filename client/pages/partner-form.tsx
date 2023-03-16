import { ADDPARTNER } from '@/lib/mutations'
import { useMutation } from '@apollo/client'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import {
  validateEmail,
  validateLength,
  validateLinkedIn,
} from '../lib/utils/dataValidation'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/context'

export interface IAddPartner {
  addPartner: {
    id: string
    createdAt: string
    updatedAt?: string
    email: string
    firstName: string
    lastName: string
    website?: string
    organization: string
    linkedIn?: string
    telegram?: string
    twitter?: string
    otherEvents?: string
    motivation: string
    rulesAccepted: boolean
    applicationStatus: string
  }
}

export interface IPartnerInput {
  firstName: string
  lastName: string
  email: string
  website?: string
  organization: string
  linkedIn?: string
  telegram?: string
  twitter?: string
  otherEvents?: string
  motivation: string
  rulesAccepted: boolean
}

export interface IPartnerFormError {
  type:
    | ''
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'organization'
    | 'linkedIn'
    | 'otherEvents'
    | 'motivation'
    | 'rulesAccepted'
  message: string
}

export default function partnerForm(): ReactElement {
  const [form, setForm] = useState<IPartnerInput>({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    organization: '',
    linkedIn: '',
    telegram: '',
    twitter: '',
    otherEvents: '',
    motivation: '',
    rulesAccepted: false,
  })
  const [error, setError] = useState<IPartnerFormError>({
    type: '',
    message: '',
  })
  const [otherEventsCount, setOtherEventsCount] = useState<number>(0)
  const [motivationCount, setMotivationCount] = useState<number>(0)
  const [addPartner, { data, error: addPartnerError }] = useMutation<
    IAddPartner
  >(ADDPARTNER)
  const { setPartner } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    if (!addPartnerError) {
      if (data) {
        setPartner(data.addPartner)
        router.replace('/success')
      }
    }
  }, [data])

  const handleOtherEventsInput = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setOtherEventsCount(e.target.value.length)
    setForm({ ...form, otherEvents: e.target.value })
  }

  const handleMotivationInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMotivationCount(e.target.value.length)
    setForm({ ...form, motivation: e.target.value })
  }

  const handleSubmit = async (): Promise<void> => {
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
    if (!form.organization) {
      setError({
        type: 'organization',
        message: 'please enter your organization',
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
    if (form.otherEvents && !validateLength(form.otherEvents)) {
      setError({
        type: 'otherEvents',
        message: 'please stay within the character range',
      })
      return
    }
    if (!validateLength(form.motivation)) {
      setError({
        type: 'motivation',
        message: 'please enter your motivation within the character range',
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
    await addPartner({ variables: { input: { ...form } } })
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form>
          <div className="-mx-3 flex flex-wrap">
            {addPartnerError && (
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
                  Website
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
            {/* organization */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="organization"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  placeholder="Your Organization Name"
                  onChange={(e) =>
                    setForm({ ...form, organization: e.target.value })
                  }
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
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-[0.7rem] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            {/* telegram */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="telegram"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Telegram
                </label>
                <input
                  type="text"
                  name="telegram"
                  id="telegram"
                  placeholder="@yourusername"
                  onChange={(e) =>
                    setForm({ ...form, telegram: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            {/* twitter */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="twitter"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Twitter
                </label>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  placeholder="@yourtwitterhandle"
                  onChange={(e) =>
                    setForm({ ...form, twitter: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          {/* otherEvents */}
          <div className="mb-5">
            <label
              htmlFor="otherEvents"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Have you supported other Ethereum events before? If yes, which
              ones?
            </label>
            <p className="mb-3 text-[#6B7280]">250-500 characters</p>
            {error.type === 'otherEvents' && (
              <p className="mb-5 text-red-500">{error.message}</p>
            )}
            <textarea
              name="otherEvents"
              id="otherEvents"
              placeholder="I supported the event . . ."
              onChange={handleOtherEventsInput}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <p className="text-[#6B7280]">{otherEventsCount}</p>
          </div>

          {/* motivation */}
          <div className="mb-5">
            <label
              htmlFor="motivation"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Why do you want to support this hackathon?
            </label>
            <p className="mb-3 text-[#6B7280]">250-500 characters</p>
            {error.type === 'motivation' && (
              <p className="mb-5 text-red-500">{error.message}</p>
            )}
            <textarea
              name="motivation"
              id="motivation"
              placeholder="I want to be a partner for this hackathon because . . ."
              onChange={handleMotivationInput}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <p className="text-[#6B7280]">{motivationCount}</p>
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
