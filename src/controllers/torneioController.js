const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { connect } = require('../../router');

const prisma = new PrismaClient();

// Display list of all torneios.
exports.torneio_list = asyncHandler(async (req, res, next) => {
  const listaTorneio = await prisma.torneio.findMany();
  if(!req.session.loggedin){
    res.render("falha_login",{title:"Faça login para visualizar torneios", torneios:listaTorneio});
  }else
  res.render("torneio_list",{title:"Lista torneio", torneios:listaTorneio});
});

exports.torneio_select_get = asyncHandler(async (req, res, next) => {
  const listaTorneio = await prisma.torneio.findMany();
  res.render("torneio_select",{title:"Escolha um torneio", torneios:listaTorneio});
});

exports.torneio_select_post = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const user = await prisma.user.findFirst({
    where:{
      nick:req.session.username
    }
  })
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      torneios: {
        connect: { id: parseInt(req.body.torneioId) }
      }
    }
  });
  res.redirect("/torneio")
});

// Display torneio create form on GET.
exports.torneio_create_get = asyncHandler(async (req, res, next) => {
  res.render("torneio_form", {title:"Criar Torneio"});
});

// Handle perfil create on POST.
exports.torneio_create_post = [
  body("nome", "perfil name must contain at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
    asyncHandler(async(req, res, next)=> {
    const errors = validationResult(req);
    console.log(req.body);
    const data = {nome: req.body.nome,descricao: req.body.descricao,jogo: req.body.jogo,premiacao: req.body.premiacao}
    const newTorneio = await prisma.torneio.create({
           data:data
         });
    res.redirect("/torneio");
  })
]

// Display torneio delete form on GET.
exports.torneio_delete_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const torneio = await prisma.torneio.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("deletar_torneio_form",{
    title:"Deletar torneio",torneio:torneio
  });
});

// Handle torneio delete on POST.
exports.torneio_delete_post = asyncHandler(async (req, res, next) => {
  const torneio = await prisma.torneio.delete({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.redirect("/torneio")
});

// Display torneio update form on GET.
exports.torneio_update_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const torneio = await prisma.torneio.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("update_torneio_form",{
    title:"Atualizar torneio",torneio:torneio
  });
});

// Handle user update on POST.
exports.torneio_update_post = asyncHandler(async (req, res, next) => {
  const data = {nome: req.body.nome,descricao: req.body.descricao,jogo: req.body.jogo,premiacao: req.body.premiacao}
  const updateTorneio = await prisma.torneio.update({
    where: { id: parseInt(req.body.id)},
    data:data
  });
  res.redirect("/torneio")
});

exports.torneio_show_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const torneio = await prisma.torneio.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  console.log(torneio)
  res.render("torneio_show",{
    title:"Detalhes do Torneio:",torneio:torneio
  });
});

exports.torneio_show_post = asyncHandler(async (req, res, next) => {
  const data = {nome: req.body.nome,descricao: req.body.descricao,jogo: req.body.jogo,premiacao: req.body.premiacao}
  const updateTorneio = await prisma.torneio.update({
    where: { id: parseInt(req.body.id)},
    data:data
  });
  res.redirect("/torneio")
});

exports.torneio_criar_chaves_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const torneio = await prisma.torneio.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("gerar_chave",{
    title:"Geração de Chaves",torneio:torneio
  });
});

exports.torneio_criar_chaves_post = asyncHandler(async (req, res, next) => {
  const quantidade = req.body.quantidade
  if(req.body.quantidade<=0){
    res.redirect("/torneio")
  }
  const data = {pontuacaoUser1: 0,pontuacaoUser2: 0}
  if(req.body.quantidade==1){
    
    const newPartida = await prisma.partida.create({
      data:data
    });
    const dataChave = {
      partida1: { connect: { id: newPartida.id } },
    }
    const newChave = await prisma.chave.create({
      data:dataChave
    });
    const torneio = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      jogo: req.body.jogo,
      premiacao: req.body.premiacao,
      chave:{connect:{id:newChave.id}},

    }
    const updateTorneio = await prisma.torneio.update({
      where: { id: parseInt(req.body.id)},
      data:torneio
    });
  } else {
    let chaveId = 0
    for(let i=0;i<req.body.quantidade;i++){
      const newPartida = await prisma.partida.create({
        data:data
      });
      let dataChave = {
        partida1: { connect: { id: newPartida.id } },
      }
      if(i<quantidade-1){
        const newPartida2 = await prisma.partida.create({
          data:data
        });
        dataChave = {
          partida1: { connect: { id: newPartida.id } },
          partida2: { connect: { id: newPartida2.id } }
        }
      }
      const newChave = await prisma.chave.create({
        data:dataChave
      });
      if(chaveId!=0){
        const updateChave = await prisma.chave.update({
          where: { id:newChave.id},
          data:{
            chaveAnteriorId:chaveId
          }
        });
      }
      chaveId = newChave.id;
    }
    const torneio = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      jogo: req.body.jogo,
      premiacao: req.body.premiacao,
      chave:{connect:{id:chaveId}},
    }
    const updateTorneio = await prisma.torneio.update({
      where: { id: parseInt(req.body.id)},
      data:torneio
    });
  }
  res.redirect("/torneio")
});

exports.torneio_listar_chaves_get = asyncHandler(async (req, res, next) => {
  let listaChave = [];
  const torneio = await prisma.torneio.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  let chaveId = torneio.chaveId
  while (chaveId != null){
    const chave = await prisma.chave.findFirst({
      where:{
        id:parseInt(chaveId)
      }
    })
    console.log(chave)
    listaChave.push(chave)
    chaveId = chave.chaveAnteriorId
  }
  const countUsuarios = await prisma.torneio.findFirst({
    where: {
      id: parseInt(req.params.id)
    },
    include:{
      _count:{
        select:{
          usuarios:true
        }
      }
    }
  });
  console.log(countUsuarios._count)
  const torneioChave = {
    contagem:countUsuarios._count.usuarios,
    chaves:listaChave,
    id:req.params.id
  }
  res.render("torneio_chave_listar",{
    title:"Listar Chaves",torneioChave:torneioChave
  });
})