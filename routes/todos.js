const todosController = require('../controllers/todosController');
const express = require('express');
const router = express.Router();
const validationMidlleware = require('../middleware/validationMiddleware');
const { TodoModelSchema } = require('../utils/validationSchema');

// router.get('/data',(req,res)=>{
// const bigData="hello".repeat(2000);
// res.send(bigData);
// });

router.post('/', validationMidlleware.validate(TodoModelSchema), todosController.createTodo);
router.get('/:id', todosController.getTodoByID);
router.delete('/:id', todosController.deleteTodo);
router.get('/', todosController.getAllTodos);
router.put('/:id', todosController.updateTodo);
router.put('/status/:id', todosController.updateStatus);

module.exports = router;
