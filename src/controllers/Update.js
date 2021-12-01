import update from '../models/update.js';
import del from  '../models/delete.js';
import home from '../models/home.js';

class Update {

    async index(req, res){
        const data = await home.show(req.session.user._id);
      
        if (home.errors.length > 0 || home.errorsDB.length > 0) return req.session.save(() => res.redirect('/'));

        res.render('regDev', {user: data});
    };

    async update(req, res) {
        const data = await update.update(req.body, req.session.user._id);

        if (update.errors.length > 0) return res.status(data.code).json(data["formErr"]);
        if (update.errorsDB.length > 0) return res.status(data.code).json(data["dbErr"]);

        req.session.user = data;
        data.password = null;

        return res.status(200).json(data);
    };


    async del(req, res) {
        const data = await del.delete(req.session.user._id);

        if (del.errorsDB.length > 0) return res.status(data.code).json(data["dbErr"]);
        
        req.session.destroy();
        res.redirect('/');
    };
};

export default new Update;