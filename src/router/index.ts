import Koa from 'koa';
import Router from 'koa-router';
import user from './user';
import analysis from './analysis';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '';
});

router.use('/user', user.routes(), user.allowedMethods());
router.use('./analysis', analysis.routes(), analysis.allowedMethods());

const useRouter = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  // 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
  app.use(router.routes());
  app.use(router.allowedMethods());
  // app.use(router.allowedMethods({
  //   throw: true, // 抛出错误，代替设置响应头状态
  //   notImplemented: () => {}, // '不支持当前请求所需要的功能',
  //   methodNotAllowed: () => {}, // '不支持的请求方式'
  // }));
};

export default useRouter;
