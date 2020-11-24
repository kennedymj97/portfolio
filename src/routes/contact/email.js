import nodemailer from 'nodemailer';

export async function post(req, res, next) {
  const poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "portoflio.contact.service",
      pass: process.env.EMAIL_SERVICE_SECRET,
    }
  };
                
  const transporter = nodemailer.createTransport(poolConfig)
  console.log(req.body)
  
  transporter.sendMail(req.body, (err, info) => {
    console.log(err)
    if (err) {
      res.writeHead(502, {
        'Content-Type': 'application/json',
        'X-Error-Code': 'Failed to send email'
      })
      let json = JSON.stringify({error: 'Failed to contact the server to send the email'});
      res.end(json);
    } else {
      console.log(info.envelope);
      console.log(info.messageId);
      res.end("Email sent successfully");
    }
    transporter.close()
  });
}

