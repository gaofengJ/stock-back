import Koa from 'koa';
import useRouter from '@/router/index';

const app = new Koa();

useRouter(app);

export default app;
