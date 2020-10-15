const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const axios = require('axios');

const app = express();
app.use(urlencoded({ extended: false }));

var body;
var from;

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  // Access the message body and the number it was sent from.
  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
  var body = req.body.Body;
  var phone = req.body.Form;
  
  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

//http.createServer(app).listen(1337, () => {
//  console.log('Express server listening on port 1337');
//});

http.createServer(app).listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port 5000');
});