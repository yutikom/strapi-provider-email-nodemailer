# strapi-provider-email-nodemailer

Nodemailer provider for Strapi with attachments support for latest Strapi versions.

Made by [Automat-IT](https://www.automat-it.com/)


## Installation

```bash
npm i strapi-provider-email-nodemailer
```

## Configuration

The Nodemailer provider can be enabled in the Strapi Admin UI via Plugins -> Emails -> Option Symbol.
After selecting Nodemailer as the provider the are the following fields.

| Field  | Description |
| ------------- | ------------- |
| Nodemailer_Default_From | Default sender address if noone is provided  |
| Nodemailer_Default_Reply-To | Default responder address if noone is provided  |
| Host | hostname or IP address to connect to (smtp.your-server.de)  |
| Port | port to connect to (in most cases: 587, 465 or 25)  |
| Username | authorisation name |
| Password | authorisation pass  |
| Secure | if true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false |
| Auth_Method | currently there are 2 Authentication Methods available:<br>SMTP (Plain and Login) and NLMT |

## Usage

To use the Nodemailer provider the plugin needs to be activated and configured.
You can call the Nodemailer in any controller or service via the Strapi email plugin.

```javascipt
strapi.plugins['email'].services.email.send({
  to: '',
  from: '',
  subject:  '',
  text:  '',
  html:  ''
})
```
Currently the following fields are supported:

| Field  | Description |
| ------------- | ------------- |
| from | Email address of the sender (e.g.'sender@example.com' or '"Sender Name" sender@server.com') |
| to | Comma separated list or an array of recipients |
| cc | Comma separated list or an array of recipients |
| bcc | Comma separated list or an array of recipients |
| subject | Subject of the email |
| text | Plaintext version of the message |
| html | HTML version of the message |
| attachments | Array of objects See: https://nodemailer.com/message/attachments/ |

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Resources

- [MIT License](LICENSE.md)
