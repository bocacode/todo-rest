const { connectDb } = require('./connectDb');

exports.createTask = (request, response) => {
  const newTask = {
    task: request.body.task,
    done: false
  };
  const db = connectDb();
  db.collection('tasks').add(newTask)
    .then(doc => response.status(201).send(doc.id))
    .catch(err => response.status(500).send(err));
}

exports.getTasks = (request, response) => {
  const db = connectDb();
  db.collection('tasks').get()
    .then(snapshot => {
      const taskList = snapshot.docs.map(doc => {
        let task = doc.data();
        task.id = doc.id;
        return task;
      })
      response.send(taskList);
    })
    .catch(err => response.status(500).send(err));
}

// exports.updateTask = (request, response) => {

// }