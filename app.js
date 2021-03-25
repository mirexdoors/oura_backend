const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const {Pool} = require('pg');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    const { rows } = await ctx.app.pool.query('SELECT $1::text as message', ['Hello, World!']);
    ctx.body = rows[0].message;
});

router.get('/:name', async (ctx) => {
    const { rows } = await ctx.app.pool.query('SELECT $1::text as message', [`Hello, ${ctx.params.name}`]);
    ctx.body = rows[0].message;
});

//Logger
app.use(Logger());

app.use(router.routes()).use(router.allowedMethods());

app.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});

//run server
app.listen(3300, () => {
    console.log('Server listening on port 3300');
});