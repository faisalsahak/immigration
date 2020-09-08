const express = require('express');
const app = express();
// var   helper = require('sendgrid').mail;
const async = require('async');
const path = require('path');
const port = 8000;
// const http = require('http');
const fs = require('fs');


//Sendgrid api info
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')));


//default viws directory for the server to retrieve static files to serve
// app.use(express.static(path.join(__dirname, './')));

// res.sendFile(__dirname + '/index.html')

app.get('/', (req, res) => res.sendFile(  '/index.html'))
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '/public/about.html')))
app.get('/assessment', (req, res) => res.sendFile(path.join(__dirname, '/public/assessment.html')))
app.get('/testimonials', (req, res) => res.sendFile(path.join(__dirname, '/public/testimonials.html')))
app.get('/study-permit', (req, res) => res.sendFile(path.join(__dirname, '/public/study-permit.html')))
app.get('/visitor-permit', (req, res) => res.sendFile(path.join(__dirname, '/public/visitor-permit.html')))
app.get('/other-permit', (req, res) => res.sendFile(path.join(__dirname, '/public/other-permit.html')))
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '/public/contact.html')))
app.get('/success', (req, res) => res.sendFile(path.join(__dirname, '/public/success.html')))
app.get('*', (req, res)=> res.sendFile(path.join(__dirname, '/public/404.html')))
// message from contact page processed here
app.post('/contact-message', (req, res) => {
	const name =  req.body.name;
	const email = req.body.email;
	const subject =  req.body.subject;
	const message =  req.body.message;
	// console.log(name + " " +email + " " + subject + " " + message)

	//Sendgrid api info
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
	  to: 'sahak.faisal@gmail.com',
	  from: email,
	  subject: subject,
	  text: message,
	  // html: '</br><strong> Name: ' + name+ '</strong>',
	};
	sgMail.send(msg);
	res.redirect('/success');
})

app.post('/book-consultancy', (req, res) => {
	const name =  req.body.name;
	const email = req.body.email;
	const phone = req.body.phone;
	const subject =  req.body.subject;
	const message =  req.body.message;
	const finalMessage = "Name: " + name + " Phone: "+ phone + "</br>" + message;
	// console.log(name + " " +email + " " + subject + " " + message)

	//Sendgrid api info
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
	  to: 'sahak.faisal@gmail.com',
	  from: email,
	  subject: subject,
	  text: finalMessage,
	  html: '<strong>' + finalMessage+ '</strong>',
	};
	sgMail.send(msg);
	res.redirect('/success');
})

// app.get('/about', (req, res) => res.sendFile('./about.html'))
// app.get('/about', (req, res) => res.sendFile('./about.html'))

// app.use('/resume', express.static(__dirname + '/resume'));

// app.get('/resume', function (req, res) {
//         var filePath = "/resume/Faisal-Sahak-resume.pdf";

//         fs.readFile(__dirname + filePath , function (err,data){
//             res.contentType("application/pdf");
//             res.send(data);
//         })
//  });


// app.get('/download', function(req, res){
//     var file = __dirname + '/Faisal-Sahak-resume.pdf';
//     res.download(file); // Set disposition and send it.
//   });

// app.get('/.well-known/pki-validation/file.txt', (req, res) => res.sendFile(__dirname+'/well-known/pki-validation/8F349EFC44FB61E5056CE23284FA9817.txt'))


// app.get('/.well-known/pki-validation/', (req, res) => res.sendFile(__dirname+'/well-known/pki-validation/8F349EFC44FB61E5056CE23284FA9817.txt'))








app.listen(port, () => console.log(`Example app listening on port ${port}!`))