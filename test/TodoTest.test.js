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
    })
    
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
    })
});
//test get All Todo
// describe('/todos',function(){
//     it()
// })


})


