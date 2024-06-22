const path = require('node:path');
const router = require("./router")
const express = require("express");
const session = require('express-session');
const { PrismaClient } = require('@prisma/client')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "pug");

app.get("/signup",function(req, res, next){
  res.render("signup", {title:"signup"});
})

app.post("/signup",async(req, res, next) => {
    console.log(req.body);
    const primeiroPerfil = await prisma.perfil.findFirst();
    const data = {name: req.body.name,nick: req.body.nick,email: req.body.email,senha: req.body.senha,perfilId: primeiroPerfil.id}
    const newUsuario = await prisma.user.create({
           data:data
         });
    req.session.loggedin = true;
    req.session.username = req.body.nick;
    req.session.perfil = primeiroPerfil.name;
    res.redirect("/torneio");
})

app.get("/login",function(req, res, next){
    res.render("login", {title:"Login"});
})

app.get('/logout', async(req, res) => {
    req.session.loggedin = false
    res.redirect("/login")
})

app.post('/login', async(request, response) => {
   // Capture the input fields
   let username = request.body.username;
   let password = request.body.password;
   // Ensure the input fields exists and are not empty
   if (username && password) {
       // Execute SQL query that'll select the account from the database based on the specified username and password
       try {
         const usuario = await prisma.user.findFirst({
            where: {
              nick: username,
              senha: password,
            },
            include: {
              perfil: true // Inclui o perfil associado ao usuário
            }
          });
 
         if (usuario) {
             // Autenticar o usuário
             request.session.loggedin = true;
             request.session.username = usuario.nick;
             request.session.perfil = usuario.perfil.name;
             // Redirecionar para a página inicial
             response.redirect('/');
         } else {
             response.send('Incorrect Username and/or Password!');
         }
     } catch (error) {
         console.error('Erro ao verificar o login:', error);
         response.status(500).send('Erro interno ao tentar verificar o login');
     } finally {
         await prisma.$disconnect(); // Desconectar do banco de dados ao final
     }
   } else {
       response.send('Please enter Username and Password!');
       response.end();
   }
});


 app.listen(3333, function () {
    console.log("ta tudo certo patrao"); //meow meow :3c
 });

const prisma = new PrismaClient()

app.use("/",router);