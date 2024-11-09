import { devices } from '@playwright/test';
import { ProjectTestConfig } from './ProjectTestConfig';

import dotenv from 'dotenv';
import path from "path";
const env = process.env.NODE_ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

const config: ProjectTestConfig = {
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 30000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },
  },
  testDir: './',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],  // This shows results in the console
    ['html'],  // This shows results in the console
    ['json', { outputFile: 'test-results/test-results.json' }],  // Save results as JSON
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
  ],
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://front-end-url.com',
    apiAuthUrl: process.env.API_AUTH_URL,
    apiUrl: process.env.API_URL,
    config_auth: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: process.env.AUDIENCE,
      grant_type: "client_credentials",
    },

    /* Launch options to use. See https://playwright.dev/docs/api/class-browsertype
      * and https://playwright.dev/docs/api/class-browsercontext#browsernewcontextoptions. */
    contextOptions: {
      viewport: { width: 1280, height: 720 },
      /*recordVideo: {
        dir: 'test-results/videos/',
        size: { width: 1280, height: 720 },
      },*/

    },
    launchOptions: {
      headless: process.env.CI ? true : false,
      slowMo: process.env.CI ? 0 : 50,
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api-test',
      use: {},
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
     {
       name: 'Google Chrome',
       use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

export default config;
