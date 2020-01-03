const db = require('../utils/db');

module.exports = {
    getIMGByProductId: ID => db.load(`select * from image where Product=${ID}`)
}