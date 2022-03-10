import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';
import CustomErrorHandler from '@/middlewares/custom-error-handler';

console.log(111);

export default createKoaServer({
  routePrefix: '/api',
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/**/*.ts`],
  middlewares: [CustomErrorHandler],
});
