const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const cors = require("cors");

dotenv.config();

app.use(express.json());
//Enable cors
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.use("/trappic/api/users", userRoute);
app.use("/trappic/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
