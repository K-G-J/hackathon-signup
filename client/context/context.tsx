import { ReactElement, createContext, useState } from 'react'

export interface IGetHacker {
  getHacker: {
    id: string
    createdAt: string
    updatedAt?: string
    email: string
    firstName: string
    lastName: string
    website?: string
    github?: string
    linkedIn?: string
    yearsOfSoftwareExperience: number
    ethExperienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
    motivation:
      | 'ATTENDWORKSHOPS'
      | 'RESUMEBUILD'
      | 'GETBETTER'
      | 'MEETCOMPANIES'
      | 'MEETPEOPLE'
      | 'LAUNCHPRODUCT'
      | 'WINPRIZE'
      | 'OTHER'
    priorBuilds?: string
    lookingToBuild?: string
    rulesAccepted: boolean
    applicationStatus: string
  }
}

export interface IGetPartner {
  getPartner: {
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

export interface IGetMentor {
  getMentor: {
    id: string
    createdAt: string
    updatedAt?: string
    email: string
    firstName: string
    lastName: string
    website?: string
    github?: string
    linkedIn?: string
    telegram?: string
    twitter?: string
    yearsOfSoftwareExperience: number
    ethExperienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
    priorMentor: string
    motivation?: string
    rulesAccepted: boolean
    applicationStatus: string
  }
}

interface IGlobalContextProps {
  hacker: IGetHacker['getHacker'] | null
  partner: IGetPartner['getPartner'] | null
  mentor: IGetMentor['getMentor'] | null
  setHacker: (hacker: IGetHacker['getHacker']) => void
  setPartner: (partner: IGetPartner['getPartner']) => void
  setMentor: (mentor: IGetMentor['getMentor']) => void
}

export const GlobalContext = createContext<IGlobalContextProps>({
  hacker: null,
  partner: null,
  mentor: null,
  setHacker: () => {},
  setPartner: () => {},
  setMentor: () => {},
})

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactElement
}) => {
  const [hacker, setHacker] = useState<IGetHacker['getHacker'] | null>(null)
  const [partner, setPartner] = useState<IGetPartner['getPartner'] | null>(null)
  const [mentor, setMentor] = useState<IGetMentor['getMentor'] | null>(null)

  return (
    <GlobalContext.Provider
      value={{
        hacker,
        partner,
        mentor,
        setHacker,
        setPartner,
        setMentor,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
