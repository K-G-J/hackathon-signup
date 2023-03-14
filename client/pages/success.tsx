import React, { ReactElement } from 'react'
import { useGlobalContext } from '../context/index'

export default function sucess(): ReactElement {
  const { hacker, partner, mentor } = useGlobalContext()
  return (
    <div>
      {hacker && (
        <div>
          <h1>You successfully registered as a hacker</h1>
          <h2>Thank you for signing up for the ETHGlobal Hackathon</h2>
          <h3>Your application status is {hacker.applicationStatus}</h3>
        </div>
      )}
      {partner && (
        <div>
          <h1>You successfully registered as a partner</h1>
          <h2>Thank you for signing up for the ETHGlobal Hackathon</h2>
          <h3>Your application status is {partner.applicationStatus}</h3>
        </div>
      )}
      {mentor && (
        <div>
          <h1>You successfully registered as a hacker</h1>
          <h2>Thank you for signing up for the ETHGlobal Hackathon</h2>
          <h3>Your application status is {mentor.applicationStatus}</h3>
        </div>
      )}
    </div>
  )
}
