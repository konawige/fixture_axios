
// fixtures.ts
import { test as base } from '@playwright/test';
import { ProjectAuthHttpClient } from './client/ProjectAuthHttpClient';
import { SubscriberHttpClient } from './client/SubscriberHttpClient';


type TestFixtures = {
    httpAuthClient: InstanceType<typeof ProjectAuthHttpClient>;
    httpWebClient: InstanceType<typeof SubscriberHttpClient>;
};

export const test = base.extend<TestFixtures>({
  httpAuthClient: async ({}, use) => {
        // Create your httpClient object (this happens for every test)
        const projectAuthHttpClient = new ProjectAuthHttpClient();

        // Make httpClient available to the tests
        await use(projectAuthHttpClient);
    },
    httpWebClient: async ({}, use) => {
        // Create your httpClient object (this happens for every test)
        const subscriberHtpClient = new SubscriberHttpClient();

        // Make httpClient available to the tests
        await use(subscriberHtpClient);
    },
});


export { expect } from '@playwright/test';
