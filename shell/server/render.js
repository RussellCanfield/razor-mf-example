import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Helmet } from "react-helmet";
import App from "../src/components/App";

export default async (req, res, next) => {
	const helmet = Helmet.renderStatic();
	let didError = false;

	//Let the consumer tell us which module/scope they want to serve.
	const { scope, module } = req.query;

	const stream = renderToPipeableStream(
		<App scope={scope} module={module} />,
		{
			onAllReady() {
				res.statusCode = didError ? 500 : 200;
				res.setHeader("Content-type", "text/html");
				res.write(`<!DOCTYPE html`);
				res.write(`<html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body>`);
				res.write(`<div id="root">`);
				stream.pipe(res);
				res.write(`</div>`);
				res.write(
					`<script async data-chunk="main" src="http://localhost:3000/static/main.js"></script>`
				);
				//Store the scope and eventually the module on a durable object client side - if we want client side.
				res.write(`<script>window.__SCOPE__="${scope}"</script>`);
				res.write(`</body></html>`);
			},
			onShellError() {
				res.statusCode = 500;
				res.send(`<h1>An error occurred</h1>`);
			},
			onError(err) {
				didError = true;
				console.error(err);
			},
		}
	);
};
