
var request = require('request');
const fs = require('fs-extra');
var pdf = require('html-pdf');

//variables de entorno
const dotenv = require("dotenv");
dotenv.config();


var fse = require('fs');
const dbSequelize = require('../config/database_sequelize.js');
const { sendEmailGmail } = require('../utils/gmail');

sequelize = dbSequelize.sequelize,
  Sequelize = dbSequelize.Sequelize;
const AWS = require('aws-sdk');
var mimemessage = require('mimemessage');

const SES_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};
const AWS_SES = new AWS.SES(SES_CONFIG);
const hbs = require('handlebars');
const path = require('path');
 
 

const sendEmail = async (templateName, userData, attachmentName, attachmentType, subject, text, isCompilePdf = false, requestId, email_sent, email_id, clientId, countClient) => {
  console.log("se envia email",userData);
  try {
    let output = await compile(templateName, userData);
    let pathFileCompiled = '';
    let pathToGmail = '';
    var mailContent = mimemessage.factory({ contentType: 'multipart/mixed', body: [] });

    console.log(`se envia por ${process.env.SENDER_EMAIL}`);

    if (process.env.SENDER_EMAIL === 'aws') {

      mailContent.header('X-SES-CONFIGURATION-SET', process.env.X_SES_CONFIGURATION_SET);
      mailContent.header('From', process.env.FROM);
      mailContent.header('To', userData.email);
      mailContent.header('Subject', subject);

      var alternateEntity = mimemessage.factory({
        contentType: 'multipart/alternate',
        body: []
      });

      var htmlEntity = mimemessage.factory({
        contentType: 'text/html;charset=utf-8',
        body: output
      });
      alternateEntity.body.push(htmlEntity);

      // var plainEntity = mimemessage.factory({
      //   body: 'Please see the attached file for a list of    customers to contact.'
      // });
      // alternateEntity.body.push(plainEntity);
      mailContent.body.push(alternateEntity);





      var statusCode;

      AWS_SES.sendRawEmail({
        RawMessage: { Data: mailContent.toString() }
      }, (err, sesdata, resp) => {
        if (err) {
          console.error("Error enviando email : " + err);
          statusCode = 400;
          // throw new Error("Error enviando email.");

        }
        if (sesdata) {
          console.log("****************************************************************");
          console.log("Correo enviado : ");
          console.log(sesdata);

          console.log("****************************************************************");
          console.log("Se envia email ");
          console.log("Subject: " + subject);
          console.log("To: " + userData.email);
          console.log("****************************************************************");

          // updatePathContract(userData.idClientDocuments, userData.name);


        }
      });



    }

    if (process.env.SENDER_EMAIL === 'gmail') {
      let resp = await sendEmailGmail(output, userData, pathToGmail, subject, text);

    }
 

  } catch (e) {
    console.log("E-119", e);
    return { status: 500, message: "No es posible enviar mensaje de texto de momento." };

  };

};

const compile = async function (templateName, data) {
  console.log(data); 
  const filePath = path.join(process.cwd(), '../templates', `${templateName}.hbs`);
  const html = await fs.readFile(filePath, 'utf-8');
  let template = hbs.compile(html);
  let result = template(data);
  return result;
};
  


module.exports = {
  sendEmail, compile  
};