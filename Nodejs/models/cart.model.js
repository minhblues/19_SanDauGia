const db = require('../utils/db');

module.exports = {
  all: () => db.load('select * from carts'),
  allByUser: Username => db.load(`select * from carts where Username = \"${username}\" and Stattus=0`),
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