require('dotenv').config();
const express = require('express');

const task_controller = require('./controllers/task_controller');

const routes = express.Router();


routes.get('/tasks', task_controller.index);
routes.post('/task', task_controller.create);
routes.delete('/task/:id', task_controller.delete);
routes.put('/task/:id', task_controller.update);



module.exports = routes;


  
