import { log } from 'console';
import app from '@/app';

const port = process.env.PORT || '3000';

app.listen(port, () => {
  log(`项目启动成功，端口号：${port}`);
});
