import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Thinkexchange, an application where you can post your project ideas, project ideas for you or someone's next project, made for all of us developers, that cannot come up with idea what to do, what to build."
        />
        <link rel="icon" type="image/png" href="/thinkexchange.png" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
