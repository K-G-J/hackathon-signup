import React from 'react'
import { useGlobalContext } from '../context/index'

type Props = {}

export default function editHackerForm({}: Props) {
  const { hacker } = useGlobalContext()
  console.log(hacker)
  return <div>EDIT HACKER FORM</div>
}
