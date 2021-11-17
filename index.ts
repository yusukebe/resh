import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const fetchUrl = url.searchParams.get("url") || "";
  const ua = url.searchParams.get("ua") || "iPhone";
  const encoding = url.searchParams.get("encoding") || "br";
  const options = url.searchParams.get("options") || "{}";

  const fetchRequest = new Request(fetchUrl);
  fetchRequest.headers.append("User-Agent", ua);
  fetchRequest.headers.append("Accept-Encoding", encoding);
  fetchRequest.headers.append("Content-Type", "text/html;charset=UTF-8");

  const hash = await JSON.parse(options);

  for (let key in hash) {
    fetchRequest.headers.append(key, hash[key]);
  }

  const fetchResponse = await fetch(fetchRequest);

  console.log(fetchResponse.status);
  const json: { [key: string]: string } = {};
  const fetchHeaders = fetchResponse.headers;
  for (const key of fetchHeaders.keys()) {
    json[key] = fetchHeaders.get(key) || "";
  }

  const body = JSON.stringify(json, null, 2);

  const response = new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response;
};

console.log("Listening on http://localhost:8000");
await serve(handler);
