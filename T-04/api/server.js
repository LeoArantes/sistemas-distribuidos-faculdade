const app = require("./config/express")();
const port = app.get("port");

// RODANDO NOSSA APLICA��O NA PORTA SETADA
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
