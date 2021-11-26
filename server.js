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




// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// const accountSid = 'ACee7ce1cda2a8d6c90906c2b874257915'//process.env.TWILIO_ACCOUNT_SID;
// const authToken = 'cff86398ae5bd3d30621849582a77459'//process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// client.calls
//       .create({
//          url: 'http://demo.twilio.com/docs/voice.xml',
//          to: '+18096618345',
//          from: '+17252285479'
//        })
//       .then(call => console.log(call.sid)).catch(err=>{
//           console.log(err);
//       });


