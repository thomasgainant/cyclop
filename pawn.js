class Pawn{
    constructor(_id){
        this._id = _id;
        this._next = null;
    }

    set(body){
        for(let key in body){
            if(key != "_id" && key != "_next"){
                this[key] = body[key];
            }
        }
    }

    get(){
        let res = {};

        for(let key in this){
            if(key != "_next"){
                res[key] = this[key];
            }
        }

        return res;
    }
}

module.exports = Pawn;