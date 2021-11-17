import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { getResponse, AppRequest, AppBody } from "./app.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const fetchUrl = url.searchParams.get("url") || "";
  const method = "GET";

  const params: { [key: string]: string } = {};
  params["User-Agent"] = url.searchParams.get("ua") || "resh/v0.0.1";
  params["Accept-Encoding"] = url.searchParams.get("encoding") || "";

  const options = url.searchParams.getAll("h");
  console.log(options);
  for (const op of options) {
    const props = op.split(":");
    console.log(props);
    params[props[0]] = props[1];
  }
  const appRequest: AppRequest = {
    headers: params,
    url: fetchUrl,
    method: method,
  };

  const app: AppBody = await getResponse(appRequest);
  const jsonString = JSON.stringify(app, null, 4);

  const response = new Response(jsonString, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response;
};

console.log("Listening on http://localhost:8000");
await serve(handler);
