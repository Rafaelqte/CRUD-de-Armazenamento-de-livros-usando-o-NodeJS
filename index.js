const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Livros = require("./database/Livros");

connection
    .authenticate()
    .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida!")

})
.catch((msgErro) => {
    console.log(msgErro)

})


//EJS E ARQUIVOS ESTATICOS
app.set('view engine', 'ejs');
app.use(express.static('public'));
//

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//


app.get("/", (req, res) => {
    res.render('homepage');


} )

app.get("/catalogo", (req,res) => {
    Livros.findAll({order: [
        ['autor', 'ASC']
    ]
        
    }).then(catlivr => {
        res.render("cat", {
            livro: catlivr,
        });
    })


});


app.get("/editlivro", (req,res) => {
    res.render("editlivros");

})




    app.post("/editandoa", (req,res) => {
            var idd = req.body.idl;
            var edit = req.body.edia;
                
            Livros.update({
                id: edit,
                },
                    {where: {id: idd}
                }).then(() => {
                    res.redirect("/")
                })
            


    })
    app.post("/editandob", (req,res) => {
        var idd = req.body.idl;
        var edit = req.body.edib;
            Livros.update({
                livro: edit},
                {where: {id: idd},
                
            }).then(() => {
                res.redirect("/")
            })

})
app.post("/editandoc", (req,res) => {
    var idd = req.body.idl;
    var edit = req.body.edic;
        Livros.update({
            autor: edit },
            {where: {id: idd}
                ,
        }).then(() => {
            res.redirect("/")
        })
    

})






app.get("/configuracoes", (req,res) => {
    res.render("config");

})

app.get("/addlivro", (req,res) => {
    res.render("addlivros");
    
});

app.post("/adicionando", (req,res) => {
    var addautor = req.body.aut;
    var addlivro = req.body.li;
    Livros.create({
        autor: addautor,
        livro: addlivro,

    }).then(() => {
        res.redirect("/");
    })

})


app.get("/exlivro", (req,res) => {
    res.render("excluirlivros");
    
});


app.post("/excluir", (req,res) => {
    var dell = req.body.delete;
    Livros.destroy({
        where : {livro: dell}

    }).then(() => {
        res.redirect("/");
    });

});

app.post("/livro", (req,res) => {
    var livro = req.body.refis
    Livros.findAll({
        where: {livro: livro, }

    }).then(livr => {
        if(livr.length != 0){
            res.render("pesq", {
                livro: livr,
    
            })
        }else{
            res.redirect("/");
        }


    })

})


app.post("/pesq", (req,res) => {
    var book = window.document.getElementById("mang");
    res.redirect("/livro/"+book);




})



app.listen(2002, () => {console.log("Aplicação Rodando!");});

