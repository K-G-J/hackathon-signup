import { ReactElement, createContext, useState } from 'react'

export interface IHacker {
  getHacker: {
    id: string
    createdAt: string
    updatedAt: string
    email: string
    firstName: string
    lastName: string
    website: string
    github: string
    linkedIn: string
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
    priorBuilds: string
    lookingToBuild: string
    rulesAccepted: boolean
    applicationStatus: string
  }
}

export interface IPartner {
  getPartner: {
    id: string
    createdAt: string
    updatedAt: string
    email: string
    firstName: string
    lastName: string
    website: string
    organization: string
    linkedIn: string
    telegram: string
    twitter: string
    otherEvents: string
    motivation: string
    rulesAccepted: boolean
    applicationStatus: string
  }
}

export interface IMentor {
  getMentor: {
    id: string
    createdAt: string
    updatedAt: string
    email: string
    firstName: string
    lastName: string
    website: string
    github: string
    linkedIn: string
    telegram: string
    twitter: string
    yearsOfSoftwareExperience: number
    ethExperienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
    priorMentor: string
    motivation: string
    rulesAccepted: boolean
    applicationStatus: string
  }
}

interface IGlobalContextProps {
  hacker: IHacker['getHacker'] | null
  partner: IPartner['getPartner'] | null
  mentor: IMentor['getMentor'] | null
  setHacker: (hacker: IHacker['getHacker']) => void
  setPartner: (partner: IPartner['getPartner']) => void
  setMentor: (mentor: IMentor['getMentor']) => void
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
  const [hacker, setHacker] = useState<IHacker['getHacker'] | null>(null)
  const [partner, setPartner] = useState<IPartner['getPartner'] | null>(null)
  const [mentor, setMentor] = useState<IMentor['getMentor'] | null>(null)

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
