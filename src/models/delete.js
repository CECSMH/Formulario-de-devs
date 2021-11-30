import Model from "./userModel.js";

class Delete {
    async delete(id) {
        this.errorsDB = [];
        
        await Model.findByIdAndDelete(id)
            .then().catch(err => { this.errorsDB.push('Usuario não existente!') });
    
        if (this.errorsDB.length > 0) return { code: 404, "dbErr": this.errorsDB };
    
        return "Usuario deletado com sucesso!";
    };
};

export default new Delete();