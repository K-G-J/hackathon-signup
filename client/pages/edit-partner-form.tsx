import { useGlobalContext } from '@/context'
import React from 'react'

type Props = {}

export default function EditPartnerForm({ }: Props) {
  const { partner } = useGlobalContext()
  console.log(partner)
  return <div>EDIT PARTNER FORM</div>
}
