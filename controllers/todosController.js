const TodoModel = require("../models/todoModel");

class todoController {
  async createTodo(req, res) {
    const { title, description, status } = req.body;

    try {
      const todo = await TodoModel.create({
        title: title,
        description: description,
        status: status,
      });
      return res.status(201).json({ message: "Todo created", todo });
    } catch (err) {
       return res.status(409).json({ message: 'Todo with this title already exists' });
    }
  }

 async getTodoByID(req, res) {
  try {
   
    const { id } = req.params;

    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo trouvé", todo });

  } catch (error) {
    console.error("getTodoByID error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

  async getAllTodos() {}
  async deleteTodo(id) {}
  async updateTodo() {}
}
module.exports = new todoController();
