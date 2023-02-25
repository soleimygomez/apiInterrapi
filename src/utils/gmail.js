//Requires
// const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const Excel = require('xlsx');

//Imports
var request = require('request');
const fs = require('fs-extra');
var pdf = require('html-pdf');

//variables de entorno
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer"); 

//constans send SMS




/**
 * transportes para el envio de email desde gmail
 */
 var mailConfig;
 if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'QA') {
  // all emails are delivered to destination
  mailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_GMAIL, // generated ethereal user
      pass: process.env.PASS_GMAIL, // contraseña generada por gmail
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  };
} 
let transporter = nodemailer.createTransport(mailConfig);
transporter.verify().then(() => {
  console.log('Listo para enviar emails por gmail');
})









/**
 * 
 * @param {*} output 
 * @param {*} userData 
 * @param {*} attachmentName 
 * @param {*} subject 
 * @param {*} text 
 * @returns 
 */
const sendEmailGmail = async (output, userData, attachmentName, subject, text) => {

  try {

    // let email = registerEmail(subject, text, '', attachmentName, attachmentType, '', userData).then(/*email => console.log(email)*/);
    console.log(userData.email)
     
    let config = {
      from: process.env.EMAIL_GMAIL,
      to:userData.email, // list of receivers
      subject: subject, // Subject line
      text: text,
      html: output
    }
    if (attachmentName !== '') {
      config.attachments = [
        {   // file on disk as an attachment
          path: attachmentName // stream this file
        }
      ]
    }

    let info = await transporter.sendMail(config);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return { status: 200, message: "Email enviado por gmail." };


  } catch (e) {
    console.log("E-119", e);
    return { status: 500, message: "No es posible enviar mensaje de texto de momento." };

  };

};






module.exports = {
  sendEmailGmail
};