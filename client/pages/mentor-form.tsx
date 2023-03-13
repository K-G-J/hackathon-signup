import { useGlobalContext } from '@/context'
import React from 'react'

type Props = {}

export default function mentorForm({ }: Props) {
  const { mentor } = useGlobalContext()
  console.log(mentor)
  return <div>MENTOR FORM</div>
}
