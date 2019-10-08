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
  auth: {
    nodemailer_default_from: {
      label: 'Nodemailer Default From',
      type: 'text'
    },
    nodemailer_default_replyto: {
      label: 'Nodemailer Default Reply-To',
      type: 'text'
    },
    host: {
      label: 'Host',
      type: 'text'
    },
    port: {
      label: 'Port',
      type: 'number'
    },
    username: {
      label: 'Username',
      type: 'text'
    },
    password: {
      label: 'Password',
      type: 'password'
    },
    secure: {
      label: 'Secure',
      type: 'enum',
      values: [
        'FALSE',
        'TRUE'
      ]
    },
    authMethod: {
      label: 'Auth Method',
      type: 'enum',
      values: [
        'SMTP',
        'ntlm'
      ]
    }
  },

  init: (config) => {
    let transporter;

    if (config.authMethod === 'ntlm'){
      transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: toBool(config.secure),
        auth: {
          type: 'custom',
          method: 'NTLM',
          user: config.username,
          pass: config.password
        },
        customAuth: {
          NTLM: nodemailerNTLMAuth
        }
      });
    }else{
      transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: toBool(config.secure),
        auth: {
          user: config.username,
          pass: config.password
        }
      })
    }

    return {
      send: (options) => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = _.isObject(options) ? options : {}
          options.from = options.from || config.nodemailer_default_from
          options.replyTo = options.replyTo || config.nodemailer_default_replyto
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
