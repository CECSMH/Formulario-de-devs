import sign from '../models/sign.js';

class Register {

    index(req, res) {
        res.render('regDev', {user: {}});
    };

    async reg(req, res) {
        const data = await sign.create(req.body);

        if (sign.errors.length > 0) return res.status(data.code).json(data["formErr"]);
        if (sign.errorsDB.length > 0) return res.status(data.code).json(data["dbErr"]);

        req.session.user = data;

        return res.status(200).json(data);
    };
};

export default new Register;