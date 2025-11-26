const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const TodoModel = require('../models/todoModel');
describe('crud todolist',function(){
     let todo;
      before(async () => {
        
         todo= await TodoModel.create({ title: 'Existing', description: 'test', status: 'pending' });
    });

    after(async () => {
        await TodoModel.deleteMany({});
    });
    //test create todo 
    describe('/todos', function () {
   

    it('should return 409 if todo title already exists', async function () {
        const response = await request(app)
            .post('/todos')
            .send({ title: 'Existing', description: 'autre description', status: 'done' })
            .set('Accept', 'application/json');

        expect(response.status).to.equal(409);
        expect(response.body.message).to.equal('Todo with this title already exists');
    });

    it('should return 201 if todo title create',async function(){
        const response = await request(app)
        .post('/todos')
        .send({title:'new todo',description:'new todo a created', status:'pending'})
        .set('Accept','application/json');

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Todo created');
    });
    
});
//tes get Todo by id

describe('/todos/:id',function(){
    it('should return 404 if todo not found',async function(){
         const fakeId = new mongoose.Types.ObjectId();
        const response=await request(app)
         .get(`/todos/${fakeId}`)
        .set('Accept','application/json')
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Todo not found');
    });
    it('should return 200 if todo found',async function(){
     
        const response=await request(app)
        .get(`/todos/${todo._id}`)
        .set('Accept', 'application/json')
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Todo trouvé');
    });
});
// test get All Todo
describe('/todos',function(){
    it('should return 200 ', async function(){
        const response=await request(app)
        .get('/todos')
        .set('Accept','application/json')
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        expect(response.body.message).to.equal('todos:' || 'todo is empty');
    }
    );
});

//delete todo
describe('/todos/:id',function(){
    it('should return 400 if invalid todo ID',async function(){
        const response=await request(app)
        .delete('/todos/12345')
        .set('Accept','application/json')
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid Todo ID');});

      it('should return 404 if todo not found',async function(){
         const fakeId = new mongoose.Types.ObjectId();
        const response=await request(app)
         .get(`/todos/${fakeId}`)
        .set('Accept','application/json')
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Todo not found');
    });
    it('should return 200 if todo deleted',async function(){
        const newTodo= await TodoModel.create({ title: 'ToDelete', description: 'to be deleted', status: 'pending' });
        const response=await request(app)
        .delete(`/todos/${newTodo._id}`)
        .set('Accept','application/json')
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Todo deleted successfully');

});


})

//update todo
describe('/todos/:id',function(){
    it('should return 400 if invalid todo ID',async function(){
        const response=await request(app)
        .put('/todos/12345')
        .set('Accept','application/json')
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid Todo ID');

    });
    it('should return 404 if todo not found',async function(){
    const fakeId = new mongoose.Types.ObjectId();
    const response=await request(app)
    .put(`/todos/${fakeId}`)
    .set('Accept','application/json')
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Todo not found');
}
    );
    it('should return 200 if todo updated',async function(){
        const newTodo= await TodoModel.create({ title: 'ToUpdate', description: 'to be updated', status: 'pending' });
        const response=await request(app)
        .put(`/todos/${newTodo._id}`)
        .send({title:'Updated Title',description:'Updated Description'})
        .set('Accept','application/json')
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Todo updated successfully');
        expect(response.body.newTodo.title).to.equal('Updated Title');
        expect(response.body.newTodo.description).to.equal('Updated Description');

});
});

describe('/status/:id', function(){
    it('should return 400 if invalid todo ID',async function(){
        const response=await request(app)
        .put('/todos/status/12345')
        .set('Accept','application/json')
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid Todo ID');
});
    it('should return 404 if todo not found',async function(){
    const fakeId = new mongoose.Types.ObjectId();
    const response=await request(app)
    .put(`/todos/status/${fakeId}`)
    .set('Accept','application/json')
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Todo not found');
}
);
    it('should return 200 if todo status updated',async function(){
        const newTodo= await TodoModel.create({ title: 'ToUpdateStatus', description: 'to be updated status', status: 'pending' });
        const response=await request(app)
        .put(`/todos/status/${newTodo._id}`)
        .set('Accept','application/json')
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Status updated successfully');
        expect(response.body.newStatus).to.equal('done');
    });
});

})
describe('/pendind',function(){
    it('should return 404 id todos pending not found',async function(){
        const response=await request(app)
        .get("/todos/pending")
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal("Todos pending not found");
        
    })
})
