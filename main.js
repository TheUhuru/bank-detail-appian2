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

  twiml.message('Thanks for contacting Baloise Insurance');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

//	Lets send some stuff to Appian
var headers = {
    'Content-Type': 'application/json',
    'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwN2M1N2IzZi04NjlhLTQyNDEtOTFiZS0zMmNkOTk0MWYwZjQifQ.XyFoBX1PsAPjEIf-TZ_5oy7pV195b7RQMCvt4LOtp9k'

}

const options = {
  headers: {'Content-Type': 'application/json',
    		'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwN2M1N2IzZi04NjlhLTQyNDEtOTFiZS0zMmNkOTk0MWYwZjQifQ.XyFoBX1PsAPjEIf-TZ_5oy7pV195b7RQMCvt4LOtp9k'}
	};

var options_old = {
    url: "https://baloise-poc.appiancloud.com/suite/webapi/update-banking" ,
    method: 'POST',
    headers: headers,
    json: true,
    body: { body:body, from:from }
}
axios.post('https://baloise-poc.appiancloud.com/suite/webapi/update-banking', `{"from":"${req.body.From}", "body":"${req.body.Body}"}`, options);


});






//http.createServer(app).listen(1337, () => {
//  console.log('Express server listening on port 1337');
//});

http.createServer(app).listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port 5000');
});