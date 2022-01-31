import Koa from 'koa';
import useRouter from '@/router';

const app = new Koa();

useRouter(app);

export default app;
