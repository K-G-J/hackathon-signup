import { useGlobalContext } from '@/context'
import React from 'react'

type Props = {}

export default function partnerForm({ }: Props) {
  const { partner } = useGlobalContext()
  console.log(partner)
  return <div>PARTNER FORM</div>
}
