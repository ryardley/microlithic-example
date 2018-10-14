import server from 'tsmill/server';

const app = server();
app.listen(3000, () => {
  console.log('Running on 3000'); // tslint:disable-line
});
