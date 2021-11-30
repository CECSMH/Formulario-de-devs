import home from '../models/home.js';

class Home {
    index(req, res) {
        res.render('home', {user: req.session.user});
    };


    async fetchAll(req, res) {
        const data = await home.index(req.query);

        if (home.errors.length > 0) return res.status(data.code).json(data["Err"]);
        if (home.errorsDB.length > 0) return res.status(data.code).json(data["dbErr"]);


        if (req.params.type === "html") {
            res.render('dev-lis', { devs: data.list, pager: data.pager });
        } else { res.status(200).json(data); };
    };


    async fetchOne(req, res) {
        const data = await home.show(req.params.id);

        if (home.errors.length > 0) return res.status(data.code).json(data["Err"]);
        if (home.errorsDB.length > 0) return res.status(data.code).json(data["dbErr"]);

        if (req.params.type === "html") {
            res.render('dev-modal', { dev: data, user: req.session.user });
        } else { res.status(200).json(data); };
    };
};

export default new Home;