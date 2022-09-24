// import Raven from "raven-js";

function init() {
   // Raven.config(
   //    "https://49a269ecbe6e41d38444f5b2cc8e6cb9@o1413615.ingest.sentry.io/6753420",
   //    { release: "1.0.0", environment: "development-test" }
   // ).install();
}

function log(error) {
   // Raven.captureException(error);
   console.error("error");
}

const logger = { init, log };

export default logger;
