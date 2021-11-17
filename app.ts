interface AppRequest {
  url: string;
  method: string;
  headers: { [key: string]: string };
}

interface AppResponse {
  headers: { [key: string]: string };
  status?: number;
  statusText?: string;
}

interface AppBody {
  request: AppRequest;
  response: AppResponse;
}

const getResponse = async (appRequest: AppRequest): Promise<AppBody> => {
  const url = toUrl(appRequest.url);

  const request = new Request(url.toString());

  const response = await fetch(request);

  const headers: { [key: string]: string } = {};
  const h = response.headers;
  for (const key of h.keys()) {
    headers[key] = h.get(key) || "";
  }

  const appResponse: AppResponse = {
    headers: headers,
    status: response.status,
    statusText: response.statusText,
  };

  const app: AppBody = {
    request: appRequest,
    response: appResponse,
  };

  return app;
};

const toUrl = (urlString: string) => {
  if (!urlString.match(/^https?:\/\//)) {
    urlString = "https://" + urlString;
  }
  const url = new URL(urlString);
  return url;
};

export { getResponse };
export type { AppRequest, AppBody };
