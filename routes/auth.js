const express = require('express');
const router = express.Router();
const Pessoa = require("../models/pessoa"); //inmporta a coleção
const bcrypt = require('bcrypt');

//...................tratamento.........................

router.post('/signup', (req, res) => {
   console.log("Entrou!")
   
Pessoa.findOne({username: req.body.username, email: req.body.email, comment: req.body.comment})

.then(informacoes => {
    if (informacoes){
        //ja existe
        return res.status(400).json({emailerror: "email já registrado no sistema"});
    }
    if (informacoes){
        return res.status(400).json({usernameerror: "usuario já registrado no sistema"});
    
    }if (informacoes){
        return res.status(400).json({commenterror: "email já registrado no sistema"});
    }
    else{
        
        //busca pelo post
        const novo_registro_pessoa = Pessoa({
            username: req.body.username,
            senha: req.body.senha,
            email: req.body.email,
            comment: req.body.comment,
        });

        //......criptografia da senha........
       
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(novo_registro_pessoa.senha, salt, function(err, hash){
             if (err) throw err;
             novo_registro_pessoa.senha = hash;

        //......salvar no banco........

             novo_registro_pessoa
                .save()
                .then(p => res.json(p))
                .catch(err => console.log(err));
        });
    });
    } 
})
    .catch(err => console.log(err));
});

    router.get("/", (req, res) => res.json({status: "Acesso permitido"}));



module.exports = router;