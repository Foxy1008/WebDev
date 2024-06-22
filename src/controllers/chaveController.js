const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

// Display list of all chaves.
exports.chave_list = asyncHandler(async (req, res, next) => {
  const listaChave = await prisma.chave.findMany();
  res.render("chave_list",{title:"Lista chaves", chaves:listaChave});
});

exports.chave_select_get = asyncHandler(async (req, res, next) => {
  res.render("chave_select",{title:"Escolha uma chave", chaves:listaChave});
});

// Display chave create form on GET.
exports.chave_create_get = asyncHandler(async (req, res, next) => {
  res.render("chave_form", {title:"Criar Chaves"});
});


// Handle chave create on POST.
exports.chave_create_post = [
  body("nome", "perfil name must contain at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
    asyncHandler(async(req, res, next)=> {
    const errors = validationResult(req);
    console.log(req.body);
    const data = {nome: req.body.nome,descricao: req.body.descricao,jogo: req.body.jogo,premiacao: req.body.premiacao}
    const newChave = await prisma.chave.create({
           data:data
         });
    res.redirect("/chave");
  })
]

// Display chave delete form on GET.
exports.chave_delete_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const chave = await prisma.chave.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("deletar_chave_form",{
    title:"Deletar Chave",chave:chave
  });
});

// Handle chave delete on POST.
exports.chave_delete_post = asyncHandler(async (req, res, next) => {
  const chave = await prisma.chave.delete({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.redirect("/torneio")
});

// Display chave update form on GET.
exports.chave_update_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const chave = await prisma.chave.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("update_chave_form",{
    title:"Atualizar Chave",chave:chave
  });
});

// Handle user update on POST.
exports.chave_update_post = asyncHandler(async (req, res, next) => {
  const data = {partida1: req.body.partida1,partida2: req.body.partida2}
  const updatedChave = await prisma.chave.update({
    where: { id: parseInt(req.body.id)},
    data:data
  });
  res.redirect("/chave")
});