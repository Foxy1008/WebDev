const express = require("express");
const router = express.Router();

// Require controller modules.
const chave_controller = require("./src/controllers/chaveController");
const partida_controller = require("./src/controllers/partidaController");
const perfil_controller = require("./src/controllers/perfilController");
const torneio_controller = require("./src/controllers/torneioController");
const user_controller = require("./src/controllers/userController");

/// BOOK ROUTES ///

// GET catalog home page.

router.get("/", (req, res)=>{
    res.render("index", {
        title:"FightClub"
    })
})

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/chave/create", chave_controller.chave_create_get);

// POST request for creating Book.
router.post("/chave/create", chave_controller.chave_create_post);

// GET request to delete Book.
router.get("/chave/:id/delete", chave_controller.chave_delete_get);

// POST request to delete Book.
router.post("/chave/:id/delete", chave_controller.chave_delete_post);

// GET request to update Book.
router.get("/chave/:id/update", chave_controller.chave_update_get);

// POST request to update Book.
router.post("/chave/:id/update", chave_controller.chave_update_post);

router.get("/chave", chave_controller.chave_list);

//////////////

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/partida/create", partida_controller.partida_create_get);

// POST request for creating Book.
router.post("/partida/create", partida_controller.partida_create_post);

// GET request to delete Book.
router.get("/partida/:id/delete", partida_controller.partida_delete_get);

// POST request to delete Book.
router.post("/partida/:id/delete", partida_controller.partida_delete_post);

// GET request to update Book.
router.get("/partida/:id/update", partida_controller.partida_update_get);

// POST request to update Book.
router.post("/partida/:id/update", partida_controller.partida_update_post);

router.get("/partida", partida_controller.partida_list);

//////////////

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/perfil/create", perfil_controller.perfil_create_get);

// POST request for creating Book.
router.post("/perfil/create", perfil_controller.perfil_create_post);

// GET request to delete Book.
router.get("/perfil/:id/delete", perfil_controller.perfil_delete_get);

// POST request to delete Book.
router.post("/perfil/:id/delete", perfil_controller.perfil_delete_post);

// GET request to update Book.
router.get("/perfil/:id/update", perfil_controller.perfil_update_get);

// POST request to update Book.
router.post("/perfil/:id/update", perfil_controller.perfil_update_post);

router.get("/perfil", perfil_controller.perfil_list);

//////////////

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/torneio/create", torneio_controller.torneio_create_get);

// POST request for creating Book.
router.post("/torneio/create", torneio_controller.torneio_create_post);

router.get("/torneio/select", torneio_controller.torneio_select_get);

router.post("/torneio/select", torneio_controller.torneio_select_post);

// GET request to delete Book.
router.get("/torneio/:id/delete", torneio_controller.torneio_delete_get);

// POST request to delete Book.
router.post("/torneio/:id/delete", torneio_controller.torneio_delete_post);

// GET request to update Book.
router.get("/torneio/:id/update", torneio_controller.torneio_update_get);

// POST request to update Book.
router.post("/torneio/:id/update", torneio_controller.torneio_update_post);

router.get("/torneio/:id/show", torneio_controller.torneio_show_get);

router.post("/torneio/:id/show", torneio_controller.torneio_show_post);

router.get("/torneio/:id/gerar_chave", torneio_controller.torneio_criar_chaves_get);

router.post("/torneio/:id/gerar_chave", torneio_controller.torneio_criar_chaves_post);

router.get("/torneio/:id/chaves", torneio_controller.torneio_listar_chaves_get);

router.get("/torneio", torneio_controller.torneio_list);

router.get("/erro", torneio_controller.torneio_list);

//////////////

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/user/create", user_controller.user_create_get);

// POST request for creating Book.
router.post("/user/create", user_controller.user_create_post);

// GET request to delete Book.
router.get("/user/:id/delete", user_controller.user_delete_get);

// POST request to delete Book.
router.post("/user/:id/delete", user_controller.user_delete_post);

// GET request to update Book.
router.get("/user/:id/update", user_controller.user_update_get);

// POST request to update Book.
router.post("/user/:id/update", user_controller.user_update_post);

router.get("/user", user_controller.user_list);


module.exports = router;