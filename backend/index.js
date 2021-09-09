const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

//Added from express js getting started
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); //Because of this you able to get json data in request

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
    console.log(`Cloudnotes app listening at http://localhost:${port}`);
});