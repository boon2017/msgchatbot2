import express from "express";
import chatbotController from "../controller/chatbotController";



let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", chatbotController.test);

    return app.use("/", router);
};

module.exports = initWebRoutes;