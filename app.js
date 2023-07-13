const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const authentication = require('./routes/authentication');
const hostel = require('./routes/hostel');
const transactions = require('./routes/transactions');
const cors = require("cors");



const app = express();

app.use(cors({
  origin: '*'
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authentication);
app.use('/api/hostel', hostel);
app.use('/api/transactions', transactions);



mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.error("unable to connect", err));

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`server connected to ${port}`);
});
