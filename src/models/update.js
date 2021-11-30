import Model from './userModel.js';
import validator from 'validator';

class Update {
    async update(body, id) {
        this.body = {};
        this.errorsDB = [];
        this.errors = [];

        for (var key in body) {
            if (body[key] === '') continue;
            this.body[key] = body[key];
        };

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push({ 'et': 'E-mail invalido!' });
        };

        if (this.errors.length > 0) return { code: 400, "formErr": this.errors };

        await Model.findByIdAndUpdate(id, this.body).then(data => {
            
            this.user = data;
        }).catch(err => this.errorsDB.push('Usuario não encontrado!'));

        if (this.errorsDB.length > 0) return { code: 404, "dbErr": this.errorsDB };

        return this.user;
    }

}

export default new Update()