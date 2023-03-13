import { useGlobalContext } from '@/context'
import React from 'react'

type Props = {}

export default function editMentorForm({ }: Props) {
  const { mentor } = useGlobalContext()
  console.log(mentor)
  return <div>EDIT MENTOR FORM</div>
}
