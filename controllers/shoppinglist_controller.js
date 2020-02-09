const shoppinglist_model = require('../models/shoppinglist-model');
const shoppinglist_views = require('../views/shoppinglist-views');

const get_shoppinglists = (req, res, next) => {
    const user = req.user;
    user.populate('shoppinglist')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            console.log('shoppinglist:', user.shoppinglist);
            let data = {
                user_name: user.name,
                shoppinglist: user.shoppinglist
            };
            let html = shoppinglist_views.shoppinglist_view(data);
            res.send(html);
        });
};

const post_delete_shoppinglist = (req, res, next) => {
    const user = req.user;
    const shoppinglist_id_to_delete = req.body.shoppinglist_id;

    //Remove shoppinglist from user.shoppinglist
    const updated_shoppinglists = user.shoppinglist.filter((shoppinglist_id) => {
        return shoppinglist_id != shoppinglist_id_to_delete;
    });
    user.shoppinglist = updated_shoppinglists;

    //Remove shoppinglist object from database
    user.save().then(() => {
        shoppinglist_model.findByIdAndRemove(shoppinglist_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_shoppinglist = (req, res, next) => {
    const shoppinglist_id = req.params.id;
    shoppinglist_model.findOne({
        _id: shoppinglist_id
    }).then((shoppinglist) => {
        let data = {
            text: shoppinglist.text
        };
        let html = shoppinglist_views.shoppinglist_view(data);
        res.send(html);
    });
};

const post_shoppinglist = (req, res, next) => {
    const user = req.user;
    let new_shoppinglist = shoppinglist_model({
        text: req.body.shoppinglist
    });
    new_shoppinglist.save().then(() => {
        console.log('shoppinglist saved');
        user.shoppinglist.push(new_shoppinglist);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_shoppinglists = get_shoppinglists;
module.exports.get_shoppinglist = get_shoppinglist;
module.exports.post_shoppinglist = post_shoppinglist;
module.exports.post_delete_shoppinglist = post_delete_shoppinglist;