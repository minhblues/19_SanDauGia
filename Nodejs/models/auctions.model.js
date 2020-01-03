const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    getAuctionByProductId: async ID => {
        ret = await db.load(`select * from  auctions where Product=${ID} order by Time desc`);
        return ret
    }
}