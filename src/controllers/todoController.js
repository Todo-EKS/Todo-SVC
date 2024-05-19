const Todo = require('../../db/models/todo');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const getTodos = async (ctx, next) => {
  try {
    const user_id = ctx.request.userInfo.user_id;
    // const todo = await Todo.query().findById(id);
    const todos = await Todo.query().whereIn('user_id', [user_id])
    ctx.body = {
      status: 'success',
      message: `success fetch data`,
      errors: null,
      data: todos
    };
  } catch (err) {
    console.error(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      error: err.message,
    };
  }
};

const addTodo = async (ctx, next) => {
  console.log('req body ', ctx.request.body)
  try {
    const user_id = ctx.request.userInfo.user_id;
    const id = uuidv4();
    const newTodo = {
      id,
      user_id,
      title: ctx.request?.body?.title,
      target_date: ctx.request?.body?.target_date ? moment(ctx.request?.body?.target_date).format('M-D-YYYY') : moment().format('M-D-YYYY'),
      completed: false,
      created_at: new Date().toISOString(),
      set_reminder: ctx.request?.body?.set_reminder
    }
    const response = await Todo.query().insert(newTodo);
    console.log('response after insert ', response)
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      message: `record ${id} created`,
      errors: null,
      data: newTodo
    }; 
  } catch (err) {
    console.error(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      status: 'error',
      message: err.message,
      errors: JSON.stringify(err),
    };
  }
}

const deleteTodo = async (ctx, next) => {
  try {
    const todoId = ctx.params.id;

    // Delete the row with the todo ID
    const numRowsDeleted = await Todo.query().deleteById(todoId);

    if (numRowsDeleted === 1) {
      // Row successfully deleted
      ctx.status = 202;
      ctx.body = {
        status: 'success',
        message: `success delete record ${todoId}`,
        errors: null,
        data: null
      }
    } else {
      // Row with the todo ID not found
      ctx.status = 404;
      ctx.body = {
        status: 'not found',
        message: `record ${todoId} not found`,
        errors: null,
        data: null
      }
    }
  } catch (err) {
    console.error(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      status: 'error',
      message: err.message,
      errors: JSON.stringify(err),
    };
  }
}

const updateTodoStatus = async (ctx, next) => {
  console.log('hit')
  try {
    const todoId = ctx.params.id;
    // const requestBody = ctx.request.body;

    const markTodo = await Todo.query().findById(todoId).patch({ completed: true });

    if (markTodo === 1) {
      ctx.body = {
        status: 'success',
        message: `record ${todoId} updated`,
        errors: null,
        data: null
      }
    } else {
      ctx.body = {
        status: 'success',
        message: `record ${todoId} not found`,
        errors: null,
        data: null
      }
    }
  } catch (err) {
    console.error(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      status: 'error',
      message: err.message,
      errors: JSON.stringify(err),
    };
  }
}

const updateTodo = async (ctx, next) => {
  try {
    const todoId = ctx.params.id;
    const requestBody = ctx.request.body;

    const numRowsUpdated = await Todo.query().findById(todoId).patch(requestBody);

    if (numRowsUpdated === 1) {
      ctx.body = {
        status: 'success',
        message: `record ${todoId} updated`,
        errors: null,
        data: null
      }
    } else {
      ctx.body = {
        status: 'success',
        message: `record ${todoId} not found`,
        errors: null,
        data: null
      }
    }
  } catch (err) {
    console.error(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      status: 'error',
      message: err.message,
      errors: JSON.stringify(err),
    };
  }
}

module.exports = { 
  getTodos,
  addTodo,
  deleteTodo,
  updateTodoStatus,
  updateTodo
};
