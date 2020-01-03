const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    getAuctionByProductId: ID => db.load(`select * from  auctions where Product=${ID} order by Time desc`),
    add: entity => db.add('auctions', entity),
    getHighestPrice: async id => {
        ret = await db.load(`select * from highestprice where Product=${id}`);
        return ret[0];
    },
    addHighestPrice: entity => db.add('highestprice', entity),
    patchHighestPrice: entity => {
        condition = { Product: entity.Product };
        delete entity.Product;
        db.patch('highestprice', entity, condition);
    }
}