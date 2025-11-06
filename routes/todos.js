const todosController=require("../controllers/todosController");
const express = require('express');
const router = express.Router();
router.post('/',todosController.createTodo);

router.get('/:id',todosController.getTodoByID);
router.delete('/:id',todosController.deleteTodo);
router.get('/',todosController.getAllTodos);
router.put('/:id',todosController.updateTodo);
router.put('/status/:id',todosController.updateStatus);
module.exports = router;

