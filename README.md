# bloomjs

BloomJS is a project with the objective of creating an online tool for 3D graphics generation which developers can use in their pages. The code has totally been
written by marcosggdev, since this is his final project for an Advanced Vocational Training in web development.

The project was developed until the deadline indicated in the AVT. At that moment, the tool offered a 3D environment with basic functions to add models to a scene,
modify their general properties like position and rotation, and export the scene which could be loaded after that with a custom lib that acted like a client.

The user could use the page, generate a scene with models, then download a folder with the assets and a lib to load them, and with a simple div with a custom id
he could embed that BloomJS scene in his own page.

The idea was to let the user generate more types of graphics and formats, but the time was too much limited for that.

This project was made public in 31/03/2024 and i will still try to make progress in my free time, but this is not the only project in which i am investing time.

I hope this is sometype of useful to web developers some day or at least a good resource of information about 3D graphics web apps with WebGL.

Project developed with Vue 3 in Vite.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
