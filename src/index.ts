import "dotenv/config";
import app from "./server.js";

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
