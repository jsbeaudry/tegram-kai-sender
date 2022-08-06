const express = require('express')
const app = express()
var cors = require('cors')
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
require("dotenv").config();

app.use(cors())


var port = process.env.PORT || 3002;


const apiId =parseInt (process.env.APIID);
const apiHash = process.env.APIHASH;
const stringSession = new StringSession(process.env.SESSION); // fill this later with the value from session.save()


app.get('/group/:to/:message', (req, res) => {
    console.log(req.params);
    const {to, message}=  req.params
    sendTel(to, message)

  res.send('Hello World!')
})




const sendTel = async (to, message) => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber:'+18096618345', //async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage(to, { message });
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



