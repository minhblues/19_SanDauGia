var express = require('express');
var exphbs = require('express-handlebars');
var utils = require('./lib/utils')

var app = express();



app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    const popular = [
        { ImgPath: 'img/arrivel/iphone11.png', Name: 'Iphone 11 Pro Max 256GB', Price: 28000000, TimeUp: '00:00:10' },
        { ImgPath: 'img/arrivel/SsGs10.png', Name: 'Samsung Galaxy S10+', Price: 28000000, TimeUp: '00:00:15' },
        { ImgPath: 'img/arrivel/Xm9SE.png', Name: 'Xiaomi Mi 9 SE', Price: 7000000, TimeUp: '00:00:14' },
        { ImgPath: 'img/arrivel/asus.jpg', Name: 'Laptop Asus TUF Gaming FX705DT-AU017T', Price: 22000000, TimeUp: '00:00:12' },
        { ImgPath: 'img/arrivel/macbook.png', Name: 'MacBook Pro 16', Price: 65000000, TimeUp: '00:00:10' }
    ]

    popular.forEach(element => {
        element.Price = utils.formatNumber(element.Price)
    });
    res.render('home', {
        popular: popular,
        TimeUp: popular,
        Expensive: popular
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})