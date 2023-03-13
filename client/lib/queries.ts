import { gql } from '@apollo/client';

export const GETHACKER = gql`
  query GetHacker($email: String!) {
    getHacker(email: $email) {
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

export const GETPARTNER = gql`
  query GetPartner($email: String!) {
    getPartner(email: $email) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      website
      linkedIn
      telegram
      twitter
      otherEvents
      rulesAccepted
      applicationStatus
    }
  }
`;

export const GETMENTOR = gql`
  query GetMentor($email: String!) {
    getMentor(email: $email) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      website
      github
      linkedIn
      telegram
      twitter
      yearsOfSoftwareExperience
      ethExperienceLevel
      priorMentor
      motivation
      rulesAccepted
      applicationStatus
    }
  }
`;
