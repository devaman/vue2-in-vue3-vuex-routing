# Vue3 use vue2 component Example

This example demos a vue3 application loading remote vue2 component.`vue3` app depends on a component exposed by `vue2` app.
We have Vuex 4 , Vue router 4 for Vue 3 and Vuex 3 , Vue router 3 for Vue 2 synced for Vue 3 as a host and Vue 2 remote.
Wrote polyfills to integerate store and router.


# Running Demo

Run `pnpm run start` . This will build and serve both `vue3` and `vue2` on ports 3002 and 3001 respectively.

- HOST (vue3): [localhost:3002](http://localhost:3002/)
- REMOTE (vue2): [localhost:3001](http://localhost:3001/)

# Running Cypress E2E Tests

To run tests in interactive mode, run `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
