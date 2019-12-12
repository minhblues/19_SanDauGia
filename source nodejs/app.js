const express = require('express');
const exphbs = require('express-handlebars');
const utils = require('./lib/utils')
const morgan = require('morgan');
const Cat = require('./models/categories.models')


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const popular = [
    { id: 1, ImgPath: 'img/arrivel/IMG1.png', Name: 'Iphone 11 Pro Max 256GB', Price: 28000000, TimeUp: '00:00:10' },
    { id: 2, ImgPath: 'img/arrivel/IMG2.png', Name: 'Samsung Galaxy S10+', Price: 28000000, TimeUp: '00:00:15' },
    { id: 3, ImgPath: 'img/arrivel/IMG3.png', Name: 'Xiaomi Mi 9 SE', Price: 7000000, TimeUp: '00:00:14' },
    { id: 4, ImgPath: 'img/arrivel/IMG4.jpg', Name: 'Laptop Asus TUF Gaming FX705DT-AU017T', Price: 22000000, TimeUp: '00:00:12' },
    { id: 5, ImgPath: 'img/arrivel/IMG5.png', Name: 'MacBook Pro 16', Price: 65000000, TimeUp: '00:00:10' }
]

popular.forEach(element => {
    element.Price = utils.formatNumber(element.Price)
});

app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));

app.set('view engine', 'hbs');

app.get('/', async(req, res) => {
    categories = await Cat.all();
    console.log(categories);
    res.render('home', {
        title: 'Sàn đấu giá',
        popular: popular,
        TimeUp: popular,
        Expensive: popular,
        categories
    });
});

app.get('/detail/:id', (req, res) => {
    res.render('detail', popular[req.params.id]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})