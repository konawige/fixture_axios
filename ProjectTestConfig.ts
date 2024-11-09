import { PlaywrightTestConfig } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export interface ProjectTestConfig extends PlaywrightTestConfig {
  // custom properties
  use?: PlaywrightTestConfig["use"] & {
    apiAuthUrl?: string;
    apiUrl?: string;
    config_auth?: {
      client_id?: string;
      client_secret?: string;
      audience?: string;
      grant_type?: string;
    }; // Add custom variable
  };
}

