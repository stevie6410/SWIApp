# SWI App

## Getting Started

### 1. Clone the source code
```
git clone http://github.beav.com/SAOSystems/SWIApp
```

### 2. Install dependencies
```
cd SWIApp
npm install
```

### 3. Start the development server and electron app
```
npm run startdevserver
npm run startelectron
```

Note that these two commands can be run simultaneousy using
```
npm run start
```

However it is often useful in development to have the two running in seperate terminals.

## Development server

Run `npm run startdevserver` for a dev server.

Run `npm run startelectron` for the electron app.

The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `out/dist/` directory. 

## Packaging & Deployment

Run `npm run packagedeploy` to simultaneously build, package and deloy a patched version of the application.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm run startdevserver` and `npm run startelectron`.

