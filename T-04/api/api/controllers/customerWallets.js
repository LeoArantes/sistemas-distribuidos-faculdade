const nodemailer = require("nodemailer");
const uuidv4 = require("uuid/v4");

module.exports = (app) => {
	const customerWalletsDB = app.data.customerWallets;
	const controller = {};

	const { customerWallets: customerWalletsMock } = customerWalletsDB;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "sistemasdistribuidosprojeto@gmail.com",
			pass: "SistemasDist123",
		},
	});

	var mailOptions = {
		from: "sistemasdistribuidosprojeto@gmail.com",
		to: "leobalionis@hotmail.com",
		subject: "Sending Email using Node.js",
		text: "That was easy!",
	};

	controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

	controller.saveCustomerWallets = (req, res) => {
        console.log("teste");

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

		res.status(201).json(customerWalletsMock);
	};

	return controller;
};
