import login from "../models/login.js"

class Login {

    index(req, res) {
        res.render('login');
    };
    

    async logIn(req, res) {

        const data = await login.singIn(req.body);

        if (login.errorsDB.length > 0) return res.status(data.code).json(data["dbErr"]);
        if (login.errors.length > 0) return res.status(data.code).json(data["formErr"]);

        req.session.user = data;

        res.status(200).json(data);
    };


    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    };
}

export default new Login