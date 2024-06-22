const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// Display list of all partidas.
exports.partida_list = asyncHandler(async (req, res, next) => {
  res.render("partida_list",{title:"Lista partidas", partidas:listaPartida});
});

exports.partida_select_get = asyncHandler(async (req, res, next) => {
  const listaPartida = await prisma.partida.findMany();
  res.render("partida_select",{title:"Escolha uma partida", partida:listaPartida});
});

// Display partida create form on GET.
exports.partida_create_get = asyncHandler(async (req, res, next) => {
  res.render("partida_form", {title:"Criar Partidas"});
});


// Handle partida create on POST.
exports.partida_create_post = [
  body("nome", "perfil name must contain at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
    asyncHandler(async(req, res, next)=> {
    const errors = validationResult(req);
    console.log(req.body);
    const data = {nome: req.body.nome,descricao: req.body.descricao,jogo: req.body.jogo,premiacao: req.body.premiacao}
    const newPartida = await prisma.partida.create({
           data:data
         });
    res.redirect("/partida");
  })
]

// Display partida delete form on GET.
exports.partida_delete_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const partida = await prisma.partida.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("deletar_partida_form",{
    title:"Deletar Partida",partida:partida
  });
});

// Handle partida delete on POST.
exports.partida_delete_post = asyncHandler(async (req, res, next) => {
  const partida = await prisma.partida.delete({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.redirect("/partida")
});

// Display partida update form on GET.
exports.partida_update_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const partida = await prisma.partida.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("update_partida_form",{
    title:"Atualizar Partida",partida:partida
  });
});

// Handle user update on POST.
exports.partida_update_post = asyncHandler(async (req, res, next) => {
  const data = {user1: req.body.user1,user2: req.body.user2,pontuacaoUser1: req.body.pontuacaoUser1,pontuacaoUser2: req.body.pontuacaoUser2}
  const updatedPartida = await prisma.partida.update({
    where: { id: parseInt(req.body.id)},
    data:data
  });
  res.redirect("/partida")
});