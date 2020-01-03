const db = require('../utils/db');

const db = require('../utils/db');

module.exports = {
  all: () => db.load('select * from carts'),
  single: Username => db.load(`select * from carts where Username = ${username}`),
  add: entity => db.add('carts', entity),
  del: id => db.del('carts', { ProductID: id }),
  patch: entity => {
    const condition = { ProductID: entity.ProductID, 
                        Username: entity.Username };
    delete entity.ProductID;
    delete entity.Username;
    return db.patch('carts', entity, condition);
  },

  
};