const http = require("http");
const url = `http://localhost:${process.env.PORT || 3000}/health`;

http
  .get(url, (res) => {
    if (res.statusCode === 200) {
      console.log("Health check passed");
      process.exit(0);
    } else {
      console.error(`Health check failed: ${res.statusCode}`);
      process.exit(1);
    }
  })
  .on("error", (err) => {
    console.error(`Health check error: ${err.message}`);
    process.exit(1);
  });
