import axios, { AxiosResponse } from "axios";
import config from "../../playwright.config";
import { SubscriberRequest } from "../payload/request/SubscriberRequest";

class SubscriberHttpClient {
  private subscriberClient = axios.create({
    baseURL: config.use?.apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  public async createSubscriber(
    subscriber: SubscriberRequest,
    token: string
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.subscriberClient.post(
      "/subscribers",
      subscriber,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }

  public async getSubscriberbyId(
    id: string,
    token: string
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.subscriberClient.get(
      "/subscribers/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }

  public async getSubscribers(
    token: string
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.subscriberClient.get(
      "/subscribers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  }
}

export { SubscriberHttpClient };
