# ETHGLOBAL CODING CHALLENGE: HACKATHON SIGNUP

## Description

This project demonstrates the registration experience of a hackathon for software engineers that are being onboarded to web3. As part of that, there are hackers, partners, and mentors associated to the event. For each of those roles, there is an application form so that hackers, partners and mentors can apply to the event.

Backend technologies: PostgreSQL, Prisma, GraphQL, Express, Apollo Server
Frontend technologies: Next, Apollo Client, Tailwind CSS

## User Story

Implement a basic applying experience for the three roles, where a user, **after signing up**, can apply as a hacker, partner, or mentor.

The application questions for each of the roles are listed at the end of Instructions.md

## Installation

NOTE: This project requires you to have a local PostgreSQL server on your machine. Instructions for how to install and set up a PostgresSQL server can be found [here](https://commandprompt.com/education/how-to-download-and-install-postgresql/)

1. Clone this repository and open terminal
2. In root directory, install dependencies with `yarn`
3. Change directories into "server"
4. In server directory, remove ".example" extension from .env.example
5. Replace the variables in capital letters for DATABASE_URL

   - YOURUSERNAME - your PostgreSQL username
   - YOURPASSWORD - your PostgreSQL password
   - PORT - the port that localhost will run your db on (usually default is 5432)
   - DBNAME - the name of your database (i.e. "hackathon")

6. Create database and schema with command `yarn prisma migrate dev`
7. Change directories back into the root directory and start up both server and client concurrently with the command `yarn run dev`
8. Navigate to [localhost on port 3000](http://localhost:3000/)
