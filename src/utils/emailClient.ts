/* eslint-disable @typescript-eslint/no-var-requires */
import config from '../config/index';
import { logger } from './logger';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

import sgMail from '@sendgrid/mail';
import { InternalServerError } from '../errors';
import * as nodemailer from 'nodemailer';

const SibApiV3Sdk = require('sib-api-v3-sdk');

enum EmailProviders {
  Sendgrid = 'sendgrid',
  SendinBlue = 'sendinBlue',
}

interface EmailData {
  templateId?: string;
  dynamicTemplateData?: object;
  html?: string;
  filePath?:string
  token?:string
  htmlPath:string
  attachments?: Array<{ [key: string]: any }>;
  
}

export const sendEmailWithSendinBlue = async (data: {
  fullName?:string
  emailFrom?: any;
  emailTo: string | string[];
  subject: string;
  data?: EmailData;
  otherRecipients?: string[];
}): Promise<void> => {

  const { emailFrom, emailTo, subject,fullName, data: emailData, otherRecipients } = data;
  
  let template: any

  if (emailData) {
    
    const pathStr = emailData.htmlPath

    const publicFolder = 'public/emailTemp';

    const filePath = path.join(publicFolder, pathStr);
  
    template = handlebars.compile(fs.readFileSync(filePath, 'utf8'));
  }
  const client = SibApiV3Sdk.ApiClient.instance;

  const apiKey = client.authentications['api-key'];

  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

  const transEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: emailFrom,
    name: "GeolandMark"
    
  };
  const value = {
    name:fullName,
    payloads:emailData?.token 
  }

  const recipients = Array.isArray(data.emailTo) ? data.emailTo.map((email) => ({ email })) : [{ email: data.emailTo }];

  try {
    await transEmailApi.sendTransacEmail({
      sender,
      to: recipients,
      subject: data.subject,
      htmlContent: template(value)
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
};

export const sendEmailWithSendgrid = async (data: {
  fullName?:string;
  emailFrom?: any;
  emailTo: string | string[];
  subject: string;
  data?: EmailData;
  otherRecipients?: string[];


}): Promise<void> => {
  try {
    sgMail.setApiKey(config.get('sendgrid.apiKey'));

    const { emailFrom, emailTo, subject, data: emailData, otherRecipients } = data;

    let configOptions = {};

    if (emailData?.templateId) {
      configOptions = {
        templateId: emailData.templateId,
        dynamic_template_data: emailData.dynamicTemplateData,
        hideWarnings: true
      };
    } else {
      configOptions = {
        html: emailData?.html,
        attachments: emailData?.attachments
      };
    }

    const response = await sgMail.send({
      to: emailTo,
      cc: otherRecipients,
      from: {
        name: 'GeolandMark',
        email: emailFrom || config.get('email.sender')
      },
      subject: subject || 'GeolandMark',
      text: '',
      ...configOptions
    });

    logger.info('[utils.emailClient] => ', response);
  } catch (error) {
    logger.error('[utils.emailClient]', error);
    throw error;
  }
};

export const sendEmail = async ({
  provider = EmailProviders.SendinBlue,
  ...data
}: {
  fullName?:string;
  emailFrom?: any;
  emailTo: string | string[];
  subject: string;
  data?: EmailData;
  otherRecipients?: string[];
  provider?: EmailProviders;
}): Promise<void> => {
  if (provider === EmailProviders.Sendgrid) {
    await sendEmailWithSendgrid(data);
  } else if (provider === EmailProviders.SendinBlue) {
    await sendEmailWithSendinBlue(data);
  } else {
    throw new InternalServerError('Email provider is invalid');
  }
};
