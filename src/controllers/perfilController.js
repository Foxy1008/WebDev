const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

// Display list of all perfils.
exports.perfil_list = asyncHandler(async (req, res, next) => {
  const listaPerfil = await prisma.perfil.findMany();
  console.log(listaPerfil);
  res.render("perfil_list",{title:"Lista Perfil", perfils:listaPerfil});
});

// Display perfil create form on GET.
exports.perfil_create_get = asyncHandler(async (req, res, next) => {
  res.render("perfil_form", {title:"Criar Perfil"});
});

// Handle perfil create on POST.
exports.perfil_create_post = [
  body("name", "perfil name must contain at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
    asyncHandler(async(req, res, next)=> {
    const errors = validationResult(req);
    const data = {name: req.body.name}
    const newPerfil = await prisma.perfil.create({
           data:data
         });
    res.redirect("/perfil")
  })
]

// Display perfil delete form on GET.
exports.perfil_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: perfil delete GET");
});

// Handle perfil delete on POST.
exports.perfil_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: perfil delete POST");
});

// Display perfil update form on GET.
exports.perfil_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: perfil update GET");
});

// Handle perfil update on POST.
exports.perfil_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: perfil update POST");
});