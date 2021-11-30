import Model from './userModel.js';

class Home {
    
    async index(query) {
        this.cleanVals();

        if (query !== undefined) this.formatFilter(query);

        await Model.find(this.query, { email: 0, password: 0, experience: 0 }, this.lo)
            .then(data => {

                if (data.length === 0) this.errors.push("Ninguem encontrado!");
                this.users = data;
            }).catch(err => { this.errorsDB.push('Database error! tente mais tarte.') });


        if (this.errors.length > 0) return { code: 404, "Err": this.errors };
        if (this.errorsDB.length > 0) return { code: 500, "dbErr": this.errorsDB };
        let count = await this.pager();

        return { "pager": count, 'list': this.users }
    }

    
    async pager() {
        let count = await Model.find(this.query).count();

        return {
            'atual': Math.floor(this.lo.skip / this.lo.limit + 1),
            'pages': Math.ceil(count / this.lo.limit),
            'results': count,
        };
    }

    
    async show(id) {
        this.cleanVals();

        await Model.findById(id, { password: 0 }).then(data => {

            if (!data) this.errors.push("Usuário não encontrado!");
            this.user = data;
        }).catch(err => { this.errorsDB.push('Database error!') });

        if (this.errors.length > 0) return { code: 404, "Err": this.errors };
        if (this.errorsDB.length > 0) return { code: 500, "dbErr": this.errorsDB };

        return this.user;
    }

    
    formatFilter(qry) {
        if (qry.sr) this.query.seniority = { $in: qry.sr.split(" ") };
        if (qry.ds) this.query.devSide = { $in: qry.ds.split(' ') };
        if (qry.st) this.query.stacks = { $all: qry.st.split(" ") };
        if (qry.fn) this.query.fullName = new RegExp(qry.fn, "i");

        this.lo.limit = 50;
        if (qry.offSet) qry.offSet === '' ? null : this.lo.skip = parseInt(qry.offSet);
        if (qry.limit && qry.limit !== '') {
            qry.limit < 50  && (this.lo.limit = parseInt(qry.limit));
        } 
    }

    
    cleanVals() {
        this.errorsDB = [];
        this.errors = [];
        this.users = [];
        this.query = {};
        this.lo = {};
        this.user = {};
    }
};

export default new Home