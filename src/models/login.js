import Model from './userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

class Login {

    async singIn(body) {
        this.body = body;
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push({'et': 'E-email invalido!'});
        if (this.body.password === "") this.errors.push({'pst': 'Senha requerida!'});
        if (this.errors.length > 0) return { code: 400, "formErr": this.errors };

        const comp = await this.passwordCompare({ email: this.body.email }, this.body.password);
        if (comp.code) return comp;

        
        return this.user
    }

    
    async passwordCompare(qry, password) {
        await Model.findOne(qry).then(data => {
            !data && this.errorsDB.push({'et': 'Usuario não encontrado!'});
            this.user = data
        }).catch(err => { this.errorsDB.push({'et': 'Usuario não encontrado!'}) });
        if (this.errorsDB.length > 0) return { code: 404, "dbErr": this.errorsDB };

        if (this.user && !bcrypt.compareSync(password, this.user.password)) {
            this.errorsDB.push({'pst': 'Senha invalida!'});
            this.user = null;
        }
        if (this.errorsDB.length > 0) return { code: 401, "dbErr": this.errorsDB };

        return { code: false }
    }

 
    cleanUp() {
        for (let key in this.body) {
            if (!typeof this.body[key] === 'string') this.body[key] = '';
        }

        this.errors = [];
        this.errorsDB = [];
        this.user = null;

        this.body = {
            email: this.body.email ? this.body.email : '',
            password: this.body.password ? this.body.password : ''
        };
    }
}

export default new Login