const TodoModel = require('../models/todoModel');

class todoController {
    // Creer Un ToDo
    async createTodo(req, res) {
        const { title, description, status } = req.body;

        const exist = await TodoModel.findOne({ title: title });

        if (exist) {
            return res.status(409).json({ message: 'Todo with this title already exists' });
        }

        try {
            const todo = await TodoModel.create({
                title: title,
                description: description,
                status: status,
            });
            return res.status(201).json({ message: 'Todo created', todo });
        } catch (err) {
            console.log(err);
            return res.status(401).json({ message: err });
        }
    }

    // Get Un Todo By ID
    async getTodoByID(req, res) {
        try {
            const { id } = req.params;

            const todo = await TodoModel.findById(id);

            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            return res.status(200).json({ message: 'Todo trouvé', todo });
        } catch (error) {
            console.error('getTodoByID error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Get All Todo
    async getAllTodos(req, res) {
        try {
            const todo = await TodoModel.find();
            res.status(200).json({
                success: true,
                message: 'todos:',
                todo: todo ? todo : 'todo is empty',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // Delet Un Todo
    async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const todo = await TodoModel.findById(id);

            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            await TodoModel.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    //update todo
    async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const todo = await TodoModel.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            const { title, description } = req.body;
            const updatedTodo = await TodoModel.findByIdAndUpdate(
                id,
                { title, description },
                { new: true }
            );
            return res
                .status(200)
                .json({ message: 'Todo updated successfully', newTodo: updatedTodo });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const todo = await TodoModel.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            if (todo.status === 'pending') {
                todo.status = 'done';
            } else {
                todo.status = 'pending';
            }
            await todo.save();

            return res.status(200).json({
                message: 'Status updated successfully',
                newStatus: todo.status,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
module.exports = new todoController();
