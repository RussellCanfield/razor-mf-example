const path = require("path");
const cors = require("cors");

module.exports = (express, app, done) => {
	app.use(
		cors({
			origin: function (origin, callback) {
				if (origin.indexOf("localhost") !== -1) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			},
		})
	);

	// static path where files such as images and js will be served from
	app.use("/static", express.static("./dist/client"));

	const renderThunk = require("./server-entry").default;
	const serverRender = renderThunk();
	app.get("/*", serverRender);

	done();
};
