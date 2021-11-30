import Model from './userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

class Sign {
   
    async create(body) {
        this.body = body;

        this.validation();
        if (this.errors.length > 0) return { code: 400, "formErr": this.errors };

        await this.exists();
        if (this.errorsDB.length > 0) return { code: 422, "dbErr": this.errorsDB };

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        await Model.create(this.body).then(data => {
            delete data.password;
            this.user = data;
        }).catch(err => this.errorsDB.push('Database error'));

        if (this.errorsDB.length > 0) return { code: 500, "dbErr": this.errorsDB };

        return this.user
    }

    
    async exists() {
        const user = await Model.findOne({ email: this.body.email });
        if (user) { this.errorsDB.push('Usuario já existente!'); };
    }

    
    validation() {
        this.cleanUp();

        if (this.body.fullName === '') this.errors.push({ 'nt': 'Nome requerido!' });
        if (!validator.isEmail(this.body.email)) this.errors.push({ 'et': 'você precisa informar um e-email valido!' });
        if (this.body.devSide === '') this.errors.push({ 'dsl': 'Escolha o seu lado de atuação!' });
        if (this.body.seniority === '') this.errors.push({ 'srt': 'Escolha o seu nivel de senioridade!' });
        if (this.body.stacks === '') this.errors.push({ 'stt': 'Escolha a/as stacks que você utiliza!' });
        if (this.body.experience === '') this.errors.push({ 'xpt': 'Descreva a sua experiencia na sua área!' })
        if (this.body.password === '') this.errors.push({ 'pst1': 'Crie uma senha!' });

        if (this.body.password.length < 3 || this.body.password.length > 12) {
            this.errors.push({ 'pst1': 'Deve ter entre 3 e 12 caracteres!' });
        }
    }

    
    cleanUp() {
        for (let key in this.body) {
            if (!typeof this.body[key] === 'string') this.body[key] = '';
        }

        this.errors = [];
        this.errorsDB = [];
        this.user = null;

        this.body = {
            fullName: this.body.fullName ? this.body.fullName : '',
            email: this.body.email ? this.body.email : '',
            devSide: this.body.devSide ? this.body.devSide : '',
            seniority: this.body.seniority ? this.body.seniority : '',
            stacks: this.body.stacks ? this.body.stacks : '',
            experience: this.body.experience ? this.body.experience : '',
            password: this.body.password ? this.body.password : ''
        }
    }
}

export default new Sign;