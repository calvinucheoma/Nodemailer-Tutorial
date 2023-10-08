const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const Mailgen = require('mailgen');
const path = require('path');

const signup = async (req, res) => {
  /**Testing Account */
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true, //true for 465, false for other ports
    auth: {
      user: testAccount.user, //generated ethereal user
      pass: testAccount.pass, //generated ethereal password
    },
  });

  let message = {
    from: '"Chukwuma Ucheoma" <ucheomachukwuma47@gmail.com>',
    to: 'ceny@example.com, deco@example.com',
    subject: 'Sign Up Successful',
    text: 'Hello bro!',
    html: '<b>Hello bro!</b>',
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: 'You should receive an email',
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });

  //   res.status(201).json('Signup Successfully');
};

/**USE THIS CODE HERE TO SEND EMAILS AS IT WORKS */

const getBill = (req, res) => {
  const { userEmail, username } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Total Foods Ltd',
      link: 'https://github.com/calvinucheoma',
    },
  });

  let response = {
    body: {
      name: username,
      intro: 'Your bill has arrived!',
      table: {
        data: [
          {
            item: 'Chicken Burger',
            description: '4 king sized chicken burgers',
            price: '₦19,000',
          },
          {
            item: 'Jollof Rice',
            description: '2 plates of jollof rice',
            price: '₦5,000',
          },
        ],
      },
      outro: 'Looking forward to do more business with you!',
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: '"Chukwuma Ucheoma" <ucheomachukwuma47@gmail.com>',
    to: userEmail,
    subject: 'Your Order(s)',
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        message:
          'You should receive an email containing your order details soon',
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
  //   res.status(201).json('Bill gotten successfully!');
};

/**ALSO USE THIS CODE HERE TO SEND EMAILS AS IT WORKS */

const sendEmail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL, //sender email address
      pass: process.env.PASSWORD, //App password from gmail account
    },
  });

  let mailOptions = {
    from: { name: 'Chukwuma Ucheoma', address: process.env.EMAIL }, //sender address
    to: ['ucheomachukwuma77@gmail.com'],
    subject: 'Learning To Send Email Using Nodemailer and Gmail',
    text: 'Hello bro, just here learning! Attached below is a copy of your resume and profile picture!',
    html: '<b>Hello bro, just me again learning! Attached below is a copy of your resume and profile picture!</b>',
    attachments: [
      {
        filename: 'MY RESUME.pdf',
        path: path.join(__dirname, 'MY RESUME.pdf'),
        contentType: 'application/pdf',
      },
      {
        filename: 'profileImage.jpg',
        path: path.join(__dirname, 'profileImage.jpg'),
        contentType: 'image/jpg',
      },
    ],
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      return res.status(201).json({
        msg: 'Sending email successful. Check your email for your pdf and avatar copy',
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
};

module.exports = { signup, getBill, sendEmail };
