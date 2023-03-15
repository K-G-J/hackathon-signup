# Coding challenge

You're running a hackathon for software engineers that are being onboarded to web3. As part of that, you have hackers, partners, and mentors associated to the event.

For each of those roles you have an application form so that hackers, partners and mentors can apply to your event.

## Problem statement
You'll implement a basic applying experience for the three roles, where a user, **after signing up**, can apply as any of the above roles.

The application questions for each of the roles are listed at the end of this document.

## User flow
This is the flow we'll be testing

1. I sign up using just my email and I'm presented with a view to apply to the hackathon as a hacker, partner, or mentor
2. When I click to apply as a hacker, I'm presented with a form that allows creating my hacker application
3. If I've already applied as a hacker before, I am presented with the same form, with the ability to modify my application and update the data.
4. I can use the flow with the other two roles (partner & mentor)
5. I can check the status of my application, and know when it's accepted / rejected.


## Expectations
1. 📣 **We'd like to be able to run your app locally and interact with the API and frontend you'll be building.**
  * Please include any pre-requisites for running your app
  * Please include all instructions to setup dependencies and run the app
2. Additionally, we may also ask you to demo the app during the interview process.
3. We recommend spending 4-6 hours on this challenge, part of the challenge is also understanding how you break down scope when implementing features with a broad scope.
4. Please submit your solution within this repo – you may setup different folders for the frontend and backend.
5. Even if you don't complete the challenge, consider submitting with however much progress you've made.

### Backend
Please use Typescript, [Prisma GraphQL][Prisma], Node, Express for your API (we also recommend using [Apollo Server][Apollo]), feel free to use any schema builders such as Pothos, Typegraphql or Nexus.

For your database, please use a relational database (Postgres, MySQL, SQLite etc.) and include any instructions to setup and start the database.

1. Make sure you design a data schema that can be extended to other roles if we were to add them, e.g. volunteers
2. Pay close attention to validating any data being received when creating or updating objects on the backend.
3. Pay close attention to authorization logic.

### Frontend
Please use Typescript, React, [NextJS][NextJS] on the frontend (we also recommend using [Apollo Client][Apollo]), and [Tailwind][Tailwind] for styling
We're interested in seeing how you use these frameworks.
1. Make sure your frontend uses types for anything fetched from the API
2. Make sure you validate data submitted to any forms on the frontend
3. Make sure you use React's useContext and useReducer hooks to model your application state
4. Pay close attention to componentizing any inputs and sharing common behaviour across forms.
5. Pay close attention to the types of inputs expected for each questions of the application


### Documentation
Think about how you would design your readme for collaboration – if someone else on the team were to follow your readme, would they be able to successfully run the frontend and the backend.


## Resources

### Hacker application questions

| Question      | Input       | Explanation |
| -----------   | ----------- | ------------|
| First Name    | Text        |             |
| Last Name     | Text        |             |
| Website       | Text        |
| Github        | Text        |             |
| Linkedin      | Text        |             |
| How many years of experience do you have with sofware development?     | Number        | Number of years of software development experience             |
| What's your experience level with Ethereum?     | Select       | select one of the following values: `beginner`, `intermediate`, `expert`             |
| What is your motivation to join this event?     | Multiselect       | A dropdown which lets you select multiple values from `["Attend workshops & tech talks", "Build something to put on my resume / portfolio", "Get better as a developer / designer", "Meet companies for a potential job opportunity", "Meet like-minded people and make friends", "Launch a product", "Win a prize", "Other"]`             |
| Tell us about what you've built before?         | TextArea (min 250 characters, max 500)       |             |
| Tell us about what are you looking to build at this hackathon?         | TextArea (min 250 characters, max 500)       |             |
| Do you accept the rules and code of conduct for the event?         | Checkbox       |             |

### Partner application questions

| Question      | Input       | Explanation |
| -----------   | ----------- | ------------|
| First Name    | Text        |             |
| Last Name     | Text        |             |
| Website       | Text        |
| Organization  | Text        |             |
| Linkedin      | Text        |             |
| Telegram      | Text        |             |
| Twitter      | Text        |             |
| Have you supported other Ethereum events before? If yes, which ones?         | TextArea (min 250 characters, max 500)       |             |
| Why do you want to support this hackathon?         | TextArea (min 250 characters, max 500)       |             |
| Do you accept the rules and code of conduct for the event?         | Checkbox       |             |

### Mentor application questions

| Question      | Input       | Explanation |
| -----------   | ----------- | ------------|
| First Name    | Text        |             |
| Last Name     | Text        |             |
| Website       | Text        |
| Github        | Text        |             |
| Linkedin      | Text        |             |
| Telegram      | Text        |             |
| Twitter      | Text        |             |
| How many years of experience do you have with sofware development?     | Number        | Number of years of software development experience             |
| What's your experience level with Ethereum?     | Select       | select one of the following values: `beginner`, `intermediate`, `expert`             |
| Have you mentored at other Ethereum events before? If yes, which ones?         | TextArea (min 250 characters, max 500)       |             |
| Why do you want to mentor at this hackathon?         | TextArea (min 250 characters, max 500)       |             |
| Do you accept the rules and code of conduct for the event?         | Checkbox       |             |


[Tailwind]: https://tailwindcss.com/
[Prisma]: https://www.prisma.io/docs
[NextJS]: https://nextjs.org/
[Apollo]: https://www.apollographql.com/docs/

If you have any questions, please reach out to moaaz@ethglobal.com
