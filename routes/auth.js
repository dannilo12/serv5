const express = require('express');
const router = express.Router();

//...................tratamento.........................

const Pessoa = require("../models/pessoa"); //inmporta a coleção

router.post('/signup', (req, res) => {
   console.log("Entrou!")
   
Pessoa.findOne({email: req.body.email})
.then(doc_pessoa => {
    if (doc_pessoa){
        //ja existe
        return res.status(400).json({emailerror: "email já registrado no sistema"});
    }else{
        //registrar email
        const novo_registro_pessoa = Pessoa({
            name: rq.body.name,
            email: req.body.email,
            senha: req.body.senha,
            username: req.body.username,
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