const helper = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

function createRequest(sender, receiver, subject, message) {
  let fromEmail = new helper.Email(sender);
  let toEmail = new helper.Email(receiver);
  let content = new helper.Content('text/plain', message);
  let mail = new helper.Mail(fromEmail, subject, toEmail, content);
  return sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
}

module.exports.sendMail = function (sender, receiver, subject, message) {
  createRequest(sender, receiver, subject, message);
  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}
