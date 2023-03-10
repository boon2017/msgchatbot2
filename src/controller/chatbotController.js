require("dotenv").config();

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
console.log(MY_VERIFY_TOKEN)


let test = (req, res) => {
    return res.send("Hello again");
}


let getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = MY_VERIFY_TOKEN;


    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];


    // Checks if a token and mode is in the query string of the request
    if (mode && token) {


        // Checks the mode and token sent is correct
        if (mode === "subscribe" && token === VERIFY_TOKEN) {


            // Responds with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);


        } else {
            // Responds with '403 Forbidden' if verify token do not match
            res.sendStatus(403);
        }
    }
}


let postWebhook = (req, res) => {
    let body = req.body;


    // Checks this is an event from a page subscription
    if (body.object === 'page') {


        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {


            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        // Returns a '200 OK' response to all requiests
        res.status(200).send(EVENT_RECEIVED);
    } else {
        // Returns a '404 Not Found' if event is not from page subscription
        res.sendStatus(404);
    }


}


function handleMessage(sender_psid, received_message) {
    // Your code here
}


function handlePostback(sender_psid, received_postback) {
    // Your code here
}


function callSendAPI(sender_psid, response) {
    // Your code here
}


module.exports = {
    test: test,
    getWebhook: getWebhook,
    postWebhook: postWebhook
};
