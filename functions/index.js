const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
const { USER, PASSWORD } = process.env;
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: USER, // generated ethereal user
    pass: PASSWORD, // generated ethereal password
  },
});

exports.sendEmail = functions.https.onRequest(async (request, response) => {
  const { name, email, subject, message } = JSON.parse(request.body);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Andrej Angeleski" <sodgamers10@gmail.com>', // sender address
    to: '"Andrej Angeleski" <sodgamers10@gmail.com>', // list of receivers
    replyTo: `${email}`,
    subject: `Form submission on website - ${subject}`, // Subject line
    text: `Hi Andrej,
      You have a new message on your website.
      From: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
      
      All the best,
      Andrej A.`, // plain text body
    html: `<p>Hi Andrej,</p>
     
      <p>You have a new message on your website.</p>
      <p>From: ${name} <br/>
      Email: ${email} <br/>
      Subject: ${subject} <br/>
      Message: ${message}</p>

      <p>All the best,<br/>
      Andrej A.</p>`, // html body
  });

  let confirmation = await transporter.sendMail({
    from: '"Andrej Angeleski" <sodgamers10@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `Form submission on website - ${subject}`, // Subject line
    text: `Hi ${name},
      Your message has been received.
    Here are the details of your message.
      From: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
      
      All the best,
      Andrej A.`, // plain text body
    html: `<p>Hi ${name},</p>
     <p>Your message has been received.</>
      <p>Here are the details of your message.</p>
      <p>From: ${name} <br/>
      Email: ${email} <br/>
      Subject: ${subject} <br/>
      Message: ${message}</p>

      <p>All the best,<br/>
      Andrej A.</p>`, // html body
  });

  response.status(200).send({ status: "OK" });
});
