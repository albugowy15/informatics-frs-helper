<div align="center">
  <a href="https://tc-frs-helper.live">
    <h1>Informatics FRS Helper</h1>
  </a>

  <p>A tool for ITS Informatics students to organize their FRS. This project is powered by <a href="https://create.t3.gg">T3 Stack</a>.</p>

  <a href="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/test.yml">
    <img src="https://github.com/albugowy15/informatics-frs-helper/actions/workflows/test.yml/badge.svg" alt="Test"/>
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

## Running Locally

To run this project locally, ensure that you have installed all the necessary tools on your machine:

- [Node.js LTS](https://nodejs.org/en)
- [pnpm version 8 or higher](https://pnpm.io)
- [Docker](https://www.docker.com)

Then, you can follow these steps:

1. Clone this repository

```bash
git clone https://github.com/albugowy/informatics-frs-helper.git
cd informatics-frs-helper
```

2. Set all the required environment variables. You can find the necessary environment variables in the `.env.example` file.
3. Install all dependencies

```bash
pnpm install
```

4. Start the MySQL database using Docker Compose

```bash
docker compose up -d db
```

5. Apply Prisma database migrations

```bash
pnpm db:push
```

6. Seed the database with prisma seeder

```bash
pnpm db:seed
```

7. Run your project in development mode

```bash
pnpm dev

# or with turbopack
pnpm dev --turbo
```

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

- **Next.js**: This is a React framework renowned for its ability to render pages on the server side and generate static websites for React-based web applications. It's a powerful tool for building highly performant and SEO-friendly web experiences.
- **tRPC**: tRPC stands out as a framework tailored for constructing APIs in a type-safe manner. By facilitating direct calls to server functions from the client, it streamlines the development process, eliminating the need for traditional approaches like REST or GraphQL.
- **Prisma**: Prisma offers a comprehensive database toolkit, encompassing an ORM, query builder, and migration tool. It simplifies database access, making tasks like data manipulation and schema migrations intuitive and straightforward.
- **NextAuth**: A robust authentication solution designed explicitly for Next.js applications. It seamlessly integrates with Next.js and Serverless architectures, providing a hassle-free way to implement secure authentication flows.
- **Tailwind**: Tailwind CSS is a utility-first CSS framework equipped with a plethora of pre-defined classes. Its unique approach allows developers to compose designs directly within their markup, offering unparalleled flexibility and efficiency in styling web applications.
- **TiDB**: TiDB is a fully-managed Database-as-a-Service (DBaaS) solution, leveraging the strengths of the TiDB distributed SQL database in the cloud. It brings scalability, resilience, and performance to cloud-native applications, simplifying database management for developers.
- **Vercel**: Vercel serves as a cloud platform tailored for hosting static sites and Serverless Functions. Its seamless integration with workflows enables developers to deploy Jamstack websites and web services instantly, with automatic scaling and minimal configuration required.
