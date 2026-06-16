import app from "./server.js";
import "dotenv/config";

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
