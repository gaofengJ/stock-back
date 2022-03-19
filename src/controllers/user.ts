import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  BodyParam,
  QueryParam,
} from 'routing-controllers';

@JsonController('/users')
export default class UserController {
  @Get('/')
  getAll(@QueryParam('enable') enable: string) {
    return `查询所有用户，状态：${enable}`;
  }

  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return `查询id为${userId}的用户`;
  }

  @Post('/create')
  createUser(
    @BodyParam('name', { required: true }) name: string,
    @BodyParam('desc', { required: true }) desc: string,
  ) {
    return `创建用户，名称：${name}，描述：${desc}`;
  }

  @Put('/update')
  updateUser(
    @BodyParam('name', { required: true }) name: string,
    @BodyParam('desc', { required: true }) desc: string,
  ) {
    return `更新用户，名称：${name}，描述：${desc}`;
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') userId: string) {
    return `删除id为${userId}的用户`;
  }
}
