const express = require('express');
const exphbs = require('express-handlebars');
const utils = require('./lib/utils')
const morgan = require('morgan');
const Cat = require('./models/categories.models')
const Product = require('./models/product.models')


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));

app.set('view engine', 'hbs');

app.get('/', async(req, res) => {
    popular = await Product.popular();
    console.log(popular);
    categories = await Cat.all();
    res.render('home', {
        title: 'Sàn đấu giá',
        popular: popular,
        TimeUp: popular,
        Expensive: popular,
        categories
    });
});

app.get('/detail/:id', async(req, res) => {
    console.log(req.params.id);
    single = await Product.single(req.params.id);
    console.log(single);
    res.render('vwProducts/detail', single[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})