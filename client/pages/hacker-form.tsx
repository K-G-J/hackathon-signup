import React from 'react'
import { useGlobalContext } from '../context/index'

type Props = {}

export default function hackerForm({}: Props) {
  const { hacker } = useGlobalContext()
  console.log(hacker)
  return <div>HACKER FORM</div>
}
