const cors = require("cors");
const app = require("./app");
const connectDb = require("./config/connection");
const { default: mongoose } = require("mongoose");

app.use(cors());

connectDb();
// port
const PORT = 5000;

// server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
