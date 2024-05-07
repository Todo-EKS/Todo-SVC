exports.seed = async function(knex) {
  // truncate existing table
  await knex.raw('TRUNCATE TABLE "koa_todo" CASCADE');
  // await knex.raw('TRUNCATE TABLE "todo-srv-db" CASCADE');

  await knex('koa_todo').insert([{
  // await knex('todo-srv-dbo').insert([{
    id: '87hy56v5-976t-657g-nh65-87hc0032tg67',
    user_id: '9c1d5e30-03e1-11ef-90e2-419eb385a24c',
    title: 'presentation prep',
    completed: false,
    created_at: '2024-04-27T17:01:41.266Z'
  },
  {
    id: '3a462968-65w3-56k1-655c-90rc0032gf7u',
    user_id: '9c1d5e30-03e1-11ef-90e2-419eb385a24c',
    title: 'after school pickup',
    completed: false,
    created_at: '2024-04-26T19:02:41.266Z'
  },
  {
    id: '5b532689-44e0-43d1-935c-08ec0032bf60',
    user_id: '9c1d5e30-03e1-11ef-90e2-419eb385a24c',
    title: 'buy soda',
    completed: false,
    created_at: '2024-04-25T17:11:41.266Z'
  },
  {
    id: '765fg5rg-87t0-98u7-432c-98gc0032b6f4',
    user_id: '2',
    title: 'pay water bill',
    completed: false,
    created_at: '2024-04-24T17:05:41.266Z'
  },
  {
    id: '54hu76j9-98k0-43f5-765d-78hc0022br4f',
    user_id: '2',
    title: 'pay car note',
    completed: false,
    created_at: '2024-04-26T14:01:43.266Z'
  }
])
}