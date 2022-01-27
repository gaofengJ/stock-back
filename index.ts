import app from '@/app';

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`项目启动成功，端口号：${port}`);
});
