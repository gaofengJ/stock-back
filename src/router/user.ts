import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '';
});
router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `获取id为${id}的用户`;
});
router.post('/', async (ctx) => {
  ctx.body = '创建用户';
});
router.put('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `修改id为${id}的用户`;
});
router.del('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `删除id为${id}的用户`;
});
router.all('/users/:id', async (ctx) => {
  ctx.body = ctx.params;
});

export default router;
