require("dotenv").config({ path: `${__dirname}/config/.env` });
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error(err.message);
  });
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
