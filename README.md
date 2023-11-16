<p align="center">
  <a href="https://tc-frs-helper.live">
    <h3 align="center">Informatics FRS Helper</h3>
  </a>
</p>

<p align="center">A tools for ITS Informatics student to organize their FRS. This project is powered by [T3 Stack](https://create.t3.gg/).</p>

<p align="center">
<a href="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/playwright.yml">
  <img src="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/playwright.yml/badge.svg" alt="Test"/>
</a> <a href="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/test.yml">
  <img src="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/test.yml/badge.svg" alt="Test"/>
</a> <a href="https://depfu.com/github/albugowy15/informatics-frs-helper?project_id=38194">
  <img src="https://badges.depfu.com/badges/3a318ae2e6a5865de276354c9eadc98f/overview.svg" alt="Depfu"/>
</a> <a href="https://github.com/albugowy15/informatics-frs-helper/pulls">
  <img src="https://img.shields.io/badge/PRs-welcome-blue" alt="PR"/>
</a>
</p>

<p align="center">
  <a href="https://tc-frs-helper.live/panduan"><strong>Documentation</strong></a> · <a href="https://tc-frs-helper.live/report"><strong>Report</strong></a> · <a href="https://github.com/albugowy15/informatics-frs-helper/discussions"><strong>Discussions</strong></a>
</p>

## Main Features

### myFRS - Plan your course registration (FRS)

Plan your course registration (FRS) by selecting a maximum of 3 classes, ensuring there are no duplicate classes, no overlapping schedules on the same day, and guaranteeing that the total credit hours do not exceed 24 for each account. This will result in a valid FRS plan and aid in more effective academic planning.

### myTradeMatkul - Course Exchange

Designed for finding course exchange partners, this feature simplifies the process for students seeking peers interested in swapping courses. This feature enable students to effortlessly connect wit counterparts and mutually exchange desired courses.

### Update Schedule

Check the timetable for each subject and class in the Course Schedule menu. Use filters to organize the schedule according to the semester and specific courses.

## Documentation

For details on how to use Informatics FRS Helper, check out the [documentation](https://tc-frs-helper.live/panduan).

## Contributing

Contributions are always welcome! Here's how you can help:

1. **Fork the repository**: You can do this by clicking the 'Fork' button at the top of the repository page. This will create a copy of the repository in your own GitHub account.

2. **Clone the repository**: Now, clone the forked repository to your local machine. This will download the code so you can work on it. You can clone the repository by running `git clone https://github.com/<your-username>/<repository-name>.git`.

3. **Create a new branch**: Create a new branch where you'll work on your feature or bugfix. You can create a new branch with `git checkout -b <branch-name>`.

4. **Make your changes**: Make the changes to the code. Make sure to follow the existing code style.

5. **Commit your changes**: Once you've made your changes, you need to commit them. You can do this with `git commit -m "Your detailed commit message"`.

6. **Push your changes**: Now you can push your changes to your forked repository on GitHub. You can do this with `git push origin <branch-name>`.

7. **Create a pull request**: Go to your forked repository on GitHub and click the 'New pull request' button. Fill out the form and then submit the pull request.

Please make sure to update tests as appropriate and ensure your code passes all checks before submitting a pull request.

Thank you for your contributions!

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
