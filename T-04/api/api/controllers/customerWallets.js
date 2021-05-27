const nodemailer = require("nodemailer");
const uuidv4 = require("uuid/v4");

module.exports = (app) => {
	const customerWalletsDB = app.data.customerWallets;
	const controller = {};

	const { customerWallets: customerWalletsMock } = customerWalletsDB;

	const transporter = nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "37afa63d8a6a29",
			pass: "c7b44e1806b08f",
		},
	});

	
	controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);
	
	controller.saveCustomerWallets = (req, res) => {
		var mailOptions = {
			from: "sistemasdistribuidosprojeto@gmail.com",
			to: req.body.email,
			subject: req.body.occupation,
			text: req.body.state,
		};

		console.log(mailOptions);
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
		customerWalletsMock.data.push({
			id: uuidv4(),
			parentId: uuidv4(),
			name: req.body.name,
			birthDate: req.body.birthDate,
			cellphone: req.body.cellphone,
			phone: req.body.phone,
			email: req.body.email,
			occupation: req.body.occupation,
			state: req.body.state,
		});

		console.log(customerWalletsMock);
		res.status(201).json(customerWalletsMock);
	};

	return controller;
};
