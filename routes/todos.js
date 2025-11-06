const todosController=require("../controllers/todosController");
const express = require('express');
const router = express.Router();
router.post('/',todosController.createTodo);
router.get('/', (req, res) => {
  res.send('Users home page');
});
router.get('/:id',todosController.getTodoByID);
router.delete('/:id',todosController.deleteTodo);
module.exports = router;

