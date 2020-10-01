const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
const hostname = '127.0.0.1'
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));
// create server
const server = http.createServer(app)


const todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Build a frontend',
  },
  {
    id: 3,
    todo: '???',
  },
  {
    id: 4,
    todo: 'Profit!',
  },
];
let nextId = 5
// GET /api/todos
app.get('/api/todos', (req, res) => {
  res.json(todoList)
})


// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params
  const todo = todoList.find(element => {
    if (element.id === parseInt(id)) {
      return true;
    }
    return false;
  })
  if (!todo) {
    res.status(404).json();
  } else {
    res.json(todo)

  }
})

// POST /api/todos
app.post('/api/todos', (req, res) => {

  console.log(req.body)
  if (!req.body.todo) {
    res.status(422).json()

  }

  const newData = {
    id: nextId++,
    todo: req.body.todo
  }
  todoList.push(newData);
  console.log(todoList)
  res.status(201).json()
})

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todoList.findIndex(element => {

    if (element.id === parseInt(id)) {
      return true;
    }
    return false;
  })
  if (!req.body.todo) {
    res.status(422).json()
  }
  const putData = {
    id: req.params.id,
    todo: req.body.todo
  }
  if (todoIndex === -1) {
    res.status(404).json();
  } else {
    todoList.splice(todoIndex, 1, putData);
    res.status(202).json()
  }
})


// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  const todoIndex = todoList.findIndex(element => {

    if (element.id === parseInt(id)) {
      return true;
    }
    return false;
  })
  if (todoIndex === -1) {
    res.status(404).json();
  } else {
    todoList.splice(todoIndex, 1);
    res.status(204).json()
  }
})

server.listen(3000, function () {
  console.log(`Todo List API is now listening on port 3000 at http://${hostname}:${port}/...`);
});