# strapi-provider-email-nodemailer-v3
Forked from *strapi-provider-email-nodemailer*

Should work with Strapi 3.0.0+

## Installation

```bash
npm i strapi-provider-email-nodemailer-v3
```

## Configuration

In your **config/plugins.js** file:
```js
module.exports = ({env}) => ({
    email: {
        provider: "nodemailer-v3",
        providerOptions: {},
        settings: {
            host: 'smtp.example.com',
            port: 587,
            username: 'username@example.com',
            password: 'password',
            secure: false
        }
    }
})
```

| Field  | Description |
| ------------- | ------------- |
| nodemailer_default_from | Default sender address if none is provided  |
| nodemailer_default_reply_to | Default responder address if none is provided  |
| host | hostname or IP address to connect to (smtp.your-server.com)  |
| port | port to connect to (in most cases: 587, 465 or 25)  |
| username | authorization username |
| password | authorization password  |
| secure | if true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25, keep it false |
| auth_method | currently there are 2 Authentication Methods available:<br>SMTP (Plain and Login) and NLMT |

To send an email from anywhere inside Strapi:
```js
await strapi.plugins['email'].services.email.send({
    to: 'someone@example.com',
    from: 'someone2@example.com',
    subject:  'Hello world',
    text:  'Hello world',
    html:  `<h4>Hello world</h4>`
  });
```   

The following fields are supported:

| Field  | Description |
| ------------- | ------------- |
| from | Email address of the sender|
| to | Comma separated list or an array of recipients |
| cc | Comma separated list or an array of recipients |
| bcc | Comma separated list or an array of recipients |
| subject | Subject of the email |
| text | Plaintext version of the message |
| html | HTML version of the message |
| attachments | Array of objects See: https://nodemailer.com/message/attachments/ |

## Troubleshooting
Check your firewall to ensure that requests are allowed. If it doesn't work with 
```js
port: 465,
secure: true
```
try using
```js
port: 587,
secure: false
```
to test if it works correctly.

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Resources

- [MIT License](LICENSE.md)
