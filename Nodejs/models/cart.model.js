const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from carts'),
    allByUser: Username => db.load(`select * from carts where Username = \"${username}\" and Stattus=0`),
    add: entity => db.add('carts', entity),
    del: (product, user) => db.load(`delete from carts where Product=${product} and User=\"${user}\"`),
    patch: entity => db.load(`update carts set Status=${entity.Status} where Product=${entity.Product} and User=\"${entity.User}\"`)


};