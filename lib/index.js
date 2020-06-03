'use strict'

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const _ = require('lodash')
const nodemailer = require('nodemailer')
const nodemailerNTLMAuth = require('nodemailer-ntlm-auth');

/**
 * Converts a string to a bool.
 *  - match 'true', 'on', or '1' as true.
 *  - ignore all white-space padding
 *  - ignore capitalization (case).
 **/
const toBool = val => /^\s*(true|1|on)\s*$/i.test(val);

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'nodemailer',
  name: 'Nodemailer',

  init: (providerOptions = {}, settings = {}) => {
    let transporter;

    if (settings.authMethod === 'ntlm'){
      transporter = nodemailer.createTransport({
        host: settings.host,
        port: settings.port,
        secure: toBool(settings.secure),
        auth: {
          type: 'custom',
          method: 'NTLM',
          user: settings.username,
          pass: settings.password
        },
        customAuth: {
          NTLM: nodemailerNTLMAuth
        }
      });
    }else{
      transporter = nodemailer.createTransport({
        host: settings.host,
        port: settings.port,
        secure: toBool(settings.secure),
        auth: {
          user: settings.username,
          pass: settings.password
        }
      })
    }

    return {
      send: (options) => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = _.isObject(options) ? options : {}
          options.from = options.from || settings.nodemailer_default_from
          options.replyTo = options.replyTo || settings.nodemailer_default_reply_to
          options.text = options.text || options.html
          options.html = options.html || options.text

          const msg = [
            'from',
            'to',
            'cc',
            'bcc',
            'subject',
            'text',
            'html',
            'attachments'
          ]

          transporter.sendMail(_.pick(options, msg))
            .then(resolve)
            .catch(error => reject(error))
        })
      }
    }
  }
}
