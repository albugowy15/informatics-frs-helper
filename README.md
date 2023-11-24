<div align="center">
  <a href="https://tc-frs-helper.live">
    <h1>Informatics FRS Helper</h1>
  </a>

  <p>A tool for ITS Informatics students to organize their FRS. This project is powered by <a href="https://create.t3.gg">T3 Stack</a>.</p>

  <a href="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/playwright.yml">
    <img src="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/playwright.yml/badge.svg" alt="Test"/>
  </a>
  <a href="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/test.yml">
    <img src="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/test.yml/badge.svg" alt="Test"/>
  </a>
  <a href="https://depfu.com/github/albugowy15/informatics-frs-helper?project_id=38194">
    <img src="https://badges.depfu.com/badges/3a318ae2e6a5865de276354c9eadc98f/overview.svg" alt="Depfu"/>
  </a>
  <a href="https://github.com/albugowy15/informatics-frs-helper/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-blue" alt="PR"/>
  </a>

<a href="https://tc-frs-helper.live/panduan"><strong>Documentation</strong></a> · <a href="https://tc-frs-helper.live/report"><strong>Report</strong></a> · <a href="https://github.com/albugowy15/informatics-frs-helper/discussions"><strong>Discussions</strong></a>

</div>

## Main Features

### myFRS - Plan your course registration (FRS)

Plan your course registration (FRS) by creating maximum of 3 plans, ensuring there are no duplicate classes, no overlapping schedules on the same day, and guaranteeing that the total credit hours (sks) do not exceed 24 for each plan. This will result in a valid FRS plan and aid in more effective academic planning.

### myTradeMatkul - Course Exchange

Designed for finding course exchange partners, simplifies the process for students seeking peers interested in swapping courses. This feature enable you to effortlessly connect with counterparts and mutually exchange desired courses.

### Update Schedule

Check the timetable for each subject and class in the Course Schedule (Jadwal Kelas) menu. Use filters to organize the schedule according to the semester and specific subject.

## Documentation

For details on how to use Informatics FRS Helper, check out the [documentation](https://tc-frs-helper.live/panduan).

## Contributing

I appreciate contributions! Refer to [CONTRIBUTING.md](https://github.com/albugowy15/informatics-frs-helper/blob/main/CONTRIBUTING.md) for details on how you can contribute. Thanks for your valuable input!

## Deployment

This project is set up for deployment on Vercel, a cloud platform that is made to deploy frontend web applications. Here's how you can deploy this project:

1. **Fork and clone the repository**: Fork this repository to your own GitHub account and then clone it to your local device.

2. **Install [Vercel CLI](https://vercel.com/download)**: The Vercel CLI is a command-line interface that allows you to deploy your projects from the command line.

3. **Login to Vercel**: Run `vercel login` and follow the instructions to log in to your Vercel account.

4. **Deploy**: Navigate to the project directory and run `vercel` to deploy the project. Vercel will automatically detect the correct settings for deployment.

5. **Visit your site**: Vercel will give you a deployment URL, visit that URL to see your deployed site.

Remember to set up all the necessary environment variables in your Vercel dashboard.

For more detailed instructions, refer to the [Vercel documentation](https://vercel.com/docs).

## Tech Stack

- **Next.js**: A React framework that enables server-side rendering and generating static websites for React based web applications.
- **tRPC**: A framework for building typesafe APIs, it eliminates the need for REST or GraphQL by allowing you to call your server's functions directly from your client.
- **Prisma**: An open-source database toolkit. It includes an ORM, a query builder and a migration tool to make database access easy and intuitive.
- **NextAuth**: A complete open source authentication solution for Next.js applications. It is designed from the ground up to support Next.js and Serverless.
- **Tailwind**: A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
- **Planetscale**: A MySQL-compatible, serverless database platform. It's designed to handle a high volume of traffic, and scales up or down automatically based on demand.
- **Vercel**: A cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host Jamstack websites and web services that deploy instantly, scale automatically, and requires no supervision, all with no configuration.
