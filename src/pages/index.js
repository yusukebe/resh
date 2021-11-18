import Head from 'next/head'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Index({ message, body }) {
  return (
    <>
      <SyntaxHighlighter language="json" style={github}>
        {JSON.stringify(body, null, 2)}
      </SyntaxHighlighter>
    </>
  );
}

export const getServerSideProps = async (c) => {
  const dev = process.env.NODE_ENV !== "production";
  const proto = dev ? "http://" : "https://";

  const host = c.req.headers.host;
  const m = c.req.url.match(/\?(.+)/)

  if (!m) {
    return {
      props: {
        body: {}
      }
    }
  }

  const res = await fetch(
    `${proto}${host}/api?${m[1]}`
  );

  const body = await res.json();

  const message = "hello!";
  return {
    props: {
      body: body,
    },
  };
};
