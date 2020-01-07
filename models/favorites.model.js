const db = require('../utils/db');
module.exports = {
    add: entity => db.add('favorites', entity),
    isFavorite: async(Username, ProductID) => {
        ret = await db.load(`select * from favorites where User=\"${Username}\" and Product =${ProductID}`);
        return ret.length != 0
    },
    del: entity => db.load(`delete from favorites where User=\"${entity.User}\" and Product=${entity.Product}`),
    all: _ => db.load(`select * from favorites`)
}