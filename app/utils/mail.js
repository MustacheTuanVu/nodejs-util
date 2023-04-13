// import nodemailer (after npm install nodemailer)
const axios = require('axios');
const moment = require('moment');

const MAIL_SERVER_CONFIG = {
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: process.env.MAIL_SECURE == 'true',
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PWD
	}
}

exports.sendMeetingNoti = async (toMail, body) => {
	if (!toMail) {
		console.log("ERROR - sendWelcomeMail eror - toMail null");
		return;
	}
	const nodemailer = require('nodemailer');

	let fs = require("fs");
	let template = fs.readFileSync('./app/templates/send_meeting.html', { encoding: 'utf-8' });
	template = template.replace('{{body}}', body ? body : '');

	// config for mailserver and mail, input your data
	const config = {
		mailserver: MAIL_SERVER_CONFIG,
		mail: {
			from: 'Taka Ecabinet <tuanvumustache@gmail.com>',
			to: toMail,
			subject: 'Thông báo cuộc họp',
			html: template
		}
	};
	// create a nodemailer transporter using smtp
	let transporter = nodemailer.createTransport(config.mailserver);

	// send mail using transporter
	let info = await transporter.sendMail(config.mail);
}