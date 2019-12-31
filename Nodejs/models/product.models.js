const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: () => db.load('select * from products'),
    countByCat: async catId => {
        const rows = await db.load(`select count(*) as total from products where Category = ${catId}`)
        return rows[0].total;
    },
    pageByCat: (catId, offset) => db.load(`select * from products where Category = ${catId} limit ${config.paginate.limit} offset ${offset}`),

    single: id => db.load(`select * from products where ProductID = ${id}`),
    popular: _ => db.load(`select products.* from products,auctions 
                            where products.ProductID=auctions.product and NOW() < products.EndTime 
                            Group by products.ProductID
                            order by count(Bidder) desc limit 5`),
    add: entity => db.add('products', entity),
    del: id => db.del('products', { ProductID: id }),
    patch: entity => {
        const condition = { ProductID: entity.ProductID };
        delete entity.ProductID;
        return db.patch('products', entity, condition);
    }
};