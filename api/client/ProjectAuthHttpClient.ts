import axios, { AxiosResponse } from 'axios';

//import config that will be set when starting playwright
import config  from '../../playwright.config';

class ProjectAuthHttpClient {

  private authClient = axios.create({
    baseURL: config.use?.apiAuthUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  public async obtainToken(): Promise<AxiosResponse> {
    
    const response: AxiosResponse = await this.authClient.post('/oauth/token', {
      client_id: config.use?.config_auth?.client_id,
    client_secret: config.use?.config_auth?.client_secret,
    audience: config.use?.config_auth?.audience,
    grant_type: config.use?.config_auth?.grant_type,
    });

    return response;
  }

}

export { ProjectAuthHttpClient };
