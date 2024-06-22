const { PrismaClient } = require('@prisma/client')
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

// Display list of all users.
exports.user_list = asyncHandler(async (req, res, next) => {
  const listaUsuario = await prisma.user.findMany();
  res.render("user_list",{title:"Lista Usuario", usuarios:listaUsuario});
});

// Display user create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user create GET");
});

// Handle user create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user create POST");
});

// Display user delete form on GET.
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user delete GET");
});

// Handle user delete on POST.
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user delete POST");
});

// Display user update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  const user = await prisma.user.findFirst({
    where:{
      id:parseInt(req.params.id)
    }
  })
  res.render("update_user_form",{
    title:"Atualizar usuario",user:user
  });
});

// Handle user update on POST.
exports.user_update_post = asyncHandler(async (req, res, next) => {
  const data = {name: req.body.name,nick: req.body.nick,email: req.body.email,senha: req.body.senha,perfilId: parseInt(req.body.perfilId)}
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(req.body.id)},
    data:data
  });
  res.redirect("/user")
});