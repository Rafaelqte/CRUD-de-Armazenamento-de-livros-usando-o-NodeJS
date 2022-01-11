const Sequelize = require("sequelize");
const connection = require("./database");


const Livros = connection.define('livro', {
    livro:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
        autor:{
            type: Sequelize.TEXT,
            allowNull: false,
        }


});


Livros.sync({force: false}).then(() => {});

module.exports = Livros;