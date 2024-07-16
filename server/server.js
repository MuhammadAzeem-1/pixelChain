const cors = require("cors")
const app = require("./app")

app.use(cors())
// port
const port = 5000;

// server connection
app.listen(port, () => {
    console.log("Server is Connected");
});
