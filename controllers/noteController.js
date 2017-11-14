const db = require('../models');

module.exports = {
    findOne: function(req,res) {
        db.Note.findOne(req.query).then( (result) => {
            res.json(result);
        })
    }
}
