import Koa from 'koa';

const app = new Koa();

app.listen(3000, () => {
  console.log('server: http://localhost:3000');
});
