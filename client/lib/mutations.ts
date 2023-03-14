import { gql } from '@apollo/client';

export const ADDHACKER = gql`
  mutation AddHacker($input: HackerInput!) {
    addHacker(input: $input) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      website
      github
      linkedIn
      yearsOfSoftwareExperience
      ethExperienceLevel
      motivation
      priorBuilds
      lookingToBuild
      rulesAccepted
      applicationStatus
    }
  }
`;

export const UPDATEHACKER = gql`
  mutation UpdateHacker($email: String!, $input: HackerInput!) {
    updateHacker(email: $email, input: $input) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      website
      github
      linkedIn
      yearsOfSoftwareExperience
      ethExperienceLevel
      motivation
      priorBuilds
      lookingToBuild
      rulesAccepted
      applicationStatus
    }
  }
`;

export const ADDPARTNER = gql`
  mutation AddPartner($input: PartnerInput!) {
    addPartner(input: $input) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      website
      organization
      linkedIn
      telegram
      twitter
      otherEvents
      motivation
      rulesAccepted
      applicationStatus
    }
  }
`;

export const UPDATEPARTNER = gql`
  mutation UpdatePartner($email: String!, $input: PartnerInput!) {
    updatePartner(email: $email, input: $input) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      website
      organization
      linkedIn
      telegram
      twitter
      otherEvents
      motivation
      rulesAccepted
      applicationStatus
    }
  }
`;
