const express = require("express");
require("./db/mongoose");
const notesRouter = require("./routers/notes");
const cors = require("cors");
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.use(express.json());
app.use(notesRouter);

app.listen(port, () => {
  console.log("Server is up on port", port);
});
