const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  // Access the message body and the number it was sent from.
  console.log('Incoming message from ${req.body.From}: ${req.body.Body}');

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