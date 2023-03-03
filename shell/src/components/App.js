import React, { Suspense } from "react";

//This example is a bit unrefined. Ideally we'd want delegate modules here, or at least
//a way to load remotes dynamically based on props - so module/scope.
const RemoteComp = React.lazy(() => import("remote1/Content"));

const getModuleScope = (scope) => {
	if (typeof window == "undefined") {
		return scope;
	}

	return window.__SCOPE__ ?? null;
};

export default ({ scope, module }) => {
	const moduleScope = getModuleScope(scope);

	const pickARemote = (scope) => {
		if (scope === "remote1") {
			return <RemoteComp />;
		}

		return null;
	};

	return (
		<Suspense fallback={<h1>Loading....</h1>}>
			{pickARemote(moduleScope)}
		</Suspense>
	);
};
