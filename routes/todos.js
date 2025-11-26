const todosController = require('../controllers/todosController');
const express = require('express');
const router = express.Router();
const validationMidlleware = require('../middleware/validationMiddleware');
const { cacheMiddleware } = require('../middleware/cacheMiddleware');
const { TodoModelSchema } = require('../utils/validationSchema');

router.post('/', validationMidlleware.validate(TodoModelSchema), todosController.createTodo);
router.get('/pending', cacheMiddleware, todosController.getTodoPending);
router.get('/:id', cacheMiddleware, todosController.getTodoByID);
router.delete('/:id', todosController.deleteTodo);
router.get('/', cacheMiddleware, todosController.getAllTodos);

router.put('/:id', todosController.updateTodo);
router.put('/status/:id', todosController.updateStatus);

module.exports = router;
