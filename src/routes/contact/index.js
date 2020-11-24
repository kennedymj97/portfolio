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
  
  transporter.sendMail(req.body, (err, info) => {
    if (err) {
      res.writeHead(502, {
        'Content-Type': 'application/json',
        'X-Error-Code': 'Failed to send email'
      })
      let json = JSON.stringify({error: 'Failed to contact the server to send the email'});
      res.end(json);
    } else {
      res.end("Email sent successfully");
    }
    transporter.close()
  });
}

