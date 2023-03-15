import React, { ReactElement } from 'react'
import { useGlobalContext } from '../context/index'
import { styleApplicationStatus } from '@/lib/utils/helpers'

export default function sucess(): ReactElement {
  const { hacker, partner, mentor } = useGlobalContext()

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        {hacker && (
          <div>
            <h1 className="mb-5 block text-base font-medium text-xl text-[#07074D]">
              You successfully registered as a hacker
            </h1>
            <h2 className="mb-5 block text-base font-medium text-l text-[#07074D]">
              Thank you for signing up for the ETHGlobal Hackathon
            </h2>
            <h3 className="mb-10">
              Your application status is{' '}
              <span
                className={styleApplicationStatus(hacker!.applicationStatus)}
              >
                {hacker!.applicationStatus}
              </span>
            </h3>
          </div>
        )}
        {partner && (
          <div>
            <h1 className="mb-3 block text-base font-medium text-xl text-[#07074D]">
              You successfully registered as a partner
            </h1>
            <h2 className="mb-5 block text-base font-medium text-l text-[#07074D]">
              Thank you for signing up for the ETHGlobal Hackathon
            </h2>
            <h3 className="mb-10">
              Your application status is{' '}
              <span
                className={styleApplicationStatus(partner!.applicationStatus)}
              >
                {partner!.applicationStatus}
              </span>
            </h3>
          </div>
        )}
        {mentor && (
          <div>
            <h1 className="mb-3 block text-base font-medium text-xl text-[#07074D]">
              You successfully registered as a mentor
            </h1>
            <h2 className="mb-5 block text-base font-medium text-l text-[#07074D]">
              Thank you for signing up for the ETHGlobal Hackathon
            </h2>
            <h3 className="mb-10">
              Your application status is{' '}
              <span
                className={styleApplicationStatus(mentor!.applicationStatus)}
              >
                {mentor!.applicationStatus}
              </span>
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}
