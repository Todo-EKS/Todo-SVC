const dbSetup = require('../db/db-setup');
//const Todo = require('../db/models/todo');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const decodeJWT = require('./services/decode-jwt');

const {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodoStatus,
  updateTodo
} = require('./controllers/todoController');

dbSetup();

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());

// Middleware to validate request
app.use(async (ctx, next) => {
  try {
    const authHeader = ctx.headers.authorization;
    let idToken;
    if(authHeader && authHeader.startsWith('Bearer ')) {
      idToken = authHeader.split('Bearer ')[1];
    } else {
      ctx.status = 401;
      return ctx.body = {
        status: 'error',
        message: 'token not found',
        errors: 'Unauthorized',
      }
    }

    let decodedToken = decodeJWT(idToken);

    // validate token
    if (!decodedToken || Object.keys(decodedToken).length == 0) {
      // throw new CustomError('Something went wrong');
      ctx.status = 401;
      return ctx.body = {
        status: 'error',
        message: 'invalid token',
        errors: 'Unauthorized',
      }
    }

    // add user_id to request
    ctx.request.userInfo = {
      user_id: decodedToken.userId
    } 

    // If validation succeeds, call the next middleware
    await next();
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
});

// fetch user todo list route
router.get('/todos', getTodos);

// add new todo for login user route
router.post('/todos', addTodo);

// delete todo for login user route
router.delete('/todos/:id', deleteTodo);

// mark complete todo for login user route
router.patch('/todos/:id', updateTodoStatus);

// update todo for login user route
router.put('/todos/:id', updateTodo);

app.use(router.routes());

app.listen(8001, () => console.log('server running on port 8001'));