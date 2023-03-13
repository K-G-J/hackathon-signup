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
