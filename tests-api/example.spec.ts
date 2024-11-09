import { AxiosResponse } from "axios";
import { test, expect } from "../api/httpFixture";
import { AuthToken } from "../api/payload/response/AuthToken";
import { SubscriberResponse } from "../api/payload/response/SubscriberResponse";

test.describe("Subscriber API", () => {
  let authToken: AuthToken = {
    access_token: "",
    scope: "",
    expires_in: 0,
    token_type: "",
  };

  test.beforeAll(async ({ httpAuthClient }) => {
    const response: AxiosResponse = await httpAuthClient.obtainToken();
    expect(response.status).toBe(200);
    authToken = response.data;
  });
  test("should return a list of subscribers", async ({ httpWebClient }) => {
    const response = await httpWebClient.getSubscribers(authToken.access_token);
    expect(response.status).toBe(200);
    //verify we have an aray of subscribers object in the response
    expect(response.data).toBeInstanceOf(Array);
  });

  test("should create a new subscriber", async ({ httpWebClient }) => {
    //use timestamp to obtain unique email address
    const timestamp = new Date().getTime();
  
    let subscriberRequest = {
      email: "john.doe" + timestamp + "@email.com",
      first_name: "John",
      last_name: "Doe",
      service: "basic",
      has_paid: true,
    };
    const response = await httpWebClient.createSubscriber(
      subscriberRequest,
      authToken.access_token
    );

    expect(response.status).toBe(201);

    //verify the response has the subscriber object
    let subscriberResponse: SubscriberResponse = response.data;
    expect(subscriberResponse).toHaveProperty("subscriber_id");
    //validate service
    expect(subscriberResponse.service).toBe(subscriberRequest.service);
    //validate date_subscribed
    expect(subscriberResponse.date_subscribed).toBeDefined();

    //get the subscriber by id
    const subscriber = await httpWebClient.getSubscriberbyId(
      subscriberResponse.subscriber_id.toString(),
      authToken.access_token
    );

    expect(subscriber.status).toBe(200);
    //validate this response match the created subscriber
    expect(subscriber.data.email).toBe(subscriberRequest.email);
    expect(subscriber.data.first_name).toBe(subscriberRequest.first_name);
    expect(subscriber.data.last_name).toBe(subscriberRequest.last_name);
    expect(subscriber.data.has_paid).toBe(subscriberRequest.has_paid);
    expect(subscriber.data.service).toBe(subscriberRequest.service);
  });
});
