import { useGlobalContext } from '@/context'
import { ReactElement, useState, useEffect, FormEvent, MouseEvent } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GETHACKER, GETPARTNER, GETMENTOR } from '../lib/queries'
import { IHacker, IPartner, IMentor } from '@/context/context'
import { useRouter } from 'next/navigation'
import { validateEmail } from '@/lib/utils/dataValidation'

export default function Home(): ReactElement {
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [
    fetchHacker,
    { loading: hackerLoading, error: hackerError, data: hackerData },
  ] = useLazyQuery<IHacker>(GETHACKER)
  const [
    fetchPartner,
    { loading: partnerLoading, error: partnerError, data: partnerData },
  ] = useLazyQuery<IPartner>(GETPARTNER)
  const [
    fetchMentor,
    { loading: mentorLoading, error: mentorError, data: mentorData },
  ] = useLazyQuery<IMentor>(GETMENTOR)
  const { setHacker, setPartner, setMentor } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    if (!hackerLoading && hackerData?.getHacker) {
      setHacker(hackerData.getHacker)
      router.replace('/edit-hacker-form')
    } else if (!partnerLoading && partnerData?.getPartner) {
      setPartner(partnerData.getPartner)
      router.replace('/edit-partner-form')
    } else if (!mentorLoading && mentorData?.getMentor) {
      setMentor(mentorData.getMentor)
      router.replace('/edit-mentor-form')
    } else if (
      hackerData?.getHacker === null &&
      partnerData?.getPartner === null &&
      mentorData?.getMentor === null
    ) {
      router.replace('signup')
    }
  }, [
    hackerData,
    partnerData,
    mentorData,
    hackerLoading,
    partnerLoading,
    mentorLoading,
  ])

  const handleSubmit = async (
    e:
      | FormEvent<HTMLFormElement>
      | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ): Promise<void> => {
    e.preventDefault()
    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    const fetchHackerRes = fetchHacker({ variables: { email } })
    const fetchPartnerRes = fetchPartner({ variables: { email } })
    const fetchMentorRes = fetchMentor({ variables: { email } })
    await Promise.all([fetchHackerRes, fetchPartnerRes, fetchMentorRes])
  }

  return (
    <>
      <main>
        <div className="mx-auto mt-10 w-full max-w-[550px]">
          <h1 className="mb-3 block text-base font-medium text-xl text-[#07074D]">
            Enter your email to join the hackathon
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <p className="mb-5 text-red-500">{emailError}</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
