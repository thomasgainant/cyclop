const fs = require('fs');

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

    //Saving on disk
    save(){
        var filteredObject = {};
        for(let index in this){
            if(index != "_next"){
                filteredObject[index] = this[index];
            }
        }

        var objectAsString = JSON.stringify(filteredObject);

        const data = new Uint8Array(Buffer.from(objectAsString));
        fs.writeFile('data/'+this._id, data, (err) => {
            if (err) throw err;
        });

        if(this._next != null && this._next != this){
            this._next.save();
        }
    }
}

module.exports = Pawn;