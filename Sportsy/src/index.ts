import express from 'express';
import njk from 'nunjucks';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
njk.configure(
  './templates', {
    express: app
  }
);

app.set('view engine', 'njk');
app.set('views', './templates');
app.use(express.static('./dist/styles'));

app.get('/', (req, res) => {
   res.render('index');
});

app.listen(PORT, () => {
   console.log(`Listening to port ${process.env.PORT}. http://localhost:${process.env.PORT}`)
});