const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: () => db.load('select * from products'),
    countByCat: async catName => {
        const rows = await db.load(`select count(*) as total from products,categories where Category = catId and CatName=\"${catName}\"`)
        return rows[0].total;
    },
    pageByCat: (catName, offset) => db.load(`select * from products,categories where Category = CatId and CatName=\"${catName}\" limit ${config.paginate.limit} offset ${offset}`),

    single: async id => {
        ret = await db.load(`select * from products where ProductID = ${id}`);
        return ret[0]
    },
    properties: id => db.load(`select * from properties where Product =${id}`),
    popular: _ => db.load(`select * from products
                            where NOW() < products.EndTime 
                            order by AuctionTime desc limit 5`),
    nearFinish: _ => db.load(`select products.* from products where EndTime-NOW()>0
                            order by EndTime-NOW() asc limit 5`),
    mostExpensive: _ => db.load(`select * from products order by Price desc limit 5`),
    popularByCat: catId => db.load(`select products.* from products  left join auctions on ProductID=product
                                                where Category = ${catId} and NOW() < EndTime 
                                                group by ProductID
                                                order by count(Bidder) desc
                                                limit ${config.paginate.limit}`),
    add: entity => db.add('products', entity),
    del: id => db.del('products', { ProductID: id }),
    patch: entity => {
        console.log(entity);
        const condition = { ProductID: entity.ProductID };
        delete entity.ProductID;
        return db.patch('products', entity, condition);
    },
    search: async(key, offset) => {
        return await db.load(`select products.*,CatName 
                                            from products left join categories on products.Category=categories.CatId
                                            where (match(Name) against(\"${key}\")) OR (match(CatName) against(\"${key}\"))
                                            limit ${config.paginate.limit} offset ${offset}`)
    },
    countBySearch: async key => {
        ret = await db.load(`select count(*) as total
                            from products left join categories on products.Category=categories.CatId
                            where (match(Name) against(\"${key}\")) OR (match(CatName) against(\"${key}\"))`);
        return ret[0].total
    },
<<<<<<< Updated upstream
    getWinningProductByUser: user=>db.load(`select * from products where EndTime<NOW() and PriceHolder=\"${user}\" and Status=0`),
    getProductByUserCart: user=>db.load(`select products.* from products,carts where ProductID=Product and User=\"${user}\"`)
=======
    getWinningProductByUser: user => db.load(`select * from products where EndTime<NOW() and PriceHolder=\"${user}\" and Status=0`),
    getProductByUserCart: user => db.load(`select products.* from products,carts where ProductID=Product and User=\"${user}\" and carts.Status=0`),
    getFavoriteProductByUser: user => db.load(`select products.* from products,favorites where ProductID=Product and User=\"${user}\"`),
    getProductByUserHistoryBidder: user => db.load(`select distinct products.* from products,auctions where ProductID=Product and Bidder=\"${user}\"`),
    getProductBySeller: user => db.load(`select products.* from products where Seller=\"${user}\"`)
>>>>>>> Stashed changes
};