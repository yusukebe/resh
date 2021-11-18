const api = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const fetchUrl = url.searchParams.get("url");

  const requestHeaders = {};
  requestHeaders["User-Agent"] = url.searchParams.get("a") || "resh/v0.0.1";
  const options = url.searchParams.getAll("h");

  for (const option of options) {
    const props = option.split(":");
    requestHeaders[props[0]] = props[1].trim();
  }

  const body = {};

  const request = new Request(fetchUrl, {
    headers: requestHeaders,
  });

  body["request"] = {
    url: request.url,
    method: request.method,
    header: await getHeadData(request.headers)
  };

  const response = await fetch(request);
  body["response"] = {
    "status": response.status,
    "statusText": response.statusText,
    "header": await getHeadData(response.headers)
  }

  res.status(200).json(body);
};

const getHeadData = async (headers) => {
  const data = {};
  for (const key of headers.keys()) {
    data[key] = headers.get(key) || "";
  }
  return data;
};

export default api;
