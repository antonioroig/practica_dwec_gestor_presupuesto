export default {
  fixturesFolder: false,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
}
