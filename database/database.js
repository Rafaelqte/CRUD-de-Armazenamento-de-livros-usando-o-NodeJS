const Sequelize = require('sequelize');
const connection = new Sequelize('biblio', 'postgres', /*Coloque a senha do seu usuário aqui*/, {
    host: '127.0.0.1',
    dialect: "postgres",
  });

module.exports = connection;
