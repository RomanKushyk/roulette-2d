# Nuxt Template

## To Create A New WebXR Project

1. Click "Use this template" on the [Nuxt Template](https://github.com/romankushyk/nuxt-template)
2. Click "Create a new repository" and give it a name and set it to private
3. Clone the new repository to your local machine
4. Open the local project folder and update the `app.config.ts` file in the project's root folder with your project details:
5. Commit and push your changes to three new branches: `development`, `staging`, and `production`

### `app.config.ts`

```typescript
  USE_SERVER: false,
  PROJECT_TITLE: 'Nuxt Template',
  NUXT_APP_CDN_URL: undefined 
  ```

## To Develop Locally

### Clone the repository

replace the template URL with your project url

```bash
git clone https://github.com/romankushyk/nuxt-template.git
```

### Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on http://localhost:3000;

```bash
npm run dev
```

## Production

Build the SSR application for production:

```bash
npm run build
```

Build a static application fro production

```bash
npm run generate
```

Locally preview production build:

```bash
npm run preview
```

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
