import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '';
});

router.get('/sentiment', async (ctx) => {
  const { startDate, endDate } = ctx.params;
  ctx.body = `开始时间：${startDate}，结束时间：${endDate}`;
});

router.get('/statistics', async (ctx) => {
  const { date } = ctx.params;
  ctx.body = `时间${date}`;
});

router.get('/rise-num', async (ctx) => {
  const { startDate, endDate } = ctx.params;
  ctx.body = `开始时间：${startDate}，结束时间：${endDate}`;
});

export default router;
