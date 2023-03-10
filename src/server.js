require("dotenv").config();
// เดิมใช้ import express from "express";
const express = require("express");
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";

let app = express();

//config view engine
viewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//init web routes
initWebRoutes(app);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running at the port: ${port}`);
});