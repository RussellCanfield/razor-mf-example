# ASP.NET MVC Razor application with module federation

This repo contains an ASP.NET MVC application using Razor pages which leverages a node process (shell) to serve up a federated module (remote1).  

The shell - node process is a simple express server [borrowed from this example](https://github.com/module-federation/module-federation-examples/tree/master/server-side-rendering).
Remote1 - is a simple react application.

This is a rough draft implementation, but the idea is that the Razor engine renders the page, and the module is federated in client side. Since Module Federation
relies on webpack, the node/shell process will run webpack and resolve modules, returning a server side rendered version of the application. This can be tweaked to defer
server side rendering, and perform it client side in the shell.

Simple change to shell/App.tsx to check for SSR/client.

```javascript
const useIsSSR = () => {
	const [ssr, setSSR] = useState(true);

	useEffect(() => {
		setSSR(false);
	}, [ssr]);

	return ssr;
};
```

Module federation server side in Razor can be tricky since you want to prevent the module fetching again client side. This can be further enhanced.

## Running the app

- yarn start for remote1
- yarn start:prod for shell
- dotnet run for the Razor application
