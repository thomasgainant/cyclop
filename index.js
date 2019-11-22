const http = require('http');
const fs = require('fs');

const Pawn = require('./pawn');

let first = null;
let last = null;
let id = 0;

//Loading
fs.readdir('data', function(err, files){
    if (err) throw err;

    let iteration = 0;
    for(let filename of files){
        fs.readFile('data/'+filename, (errFile, data) => {
            if (errFile) throw errFile;

            let JSONdata = JSON.parse(data);
            add(JSONdata);

            iteration++;
            if(iteration >= files.length){
                //Querying
                http.createServer(function (req, res) {
                    let body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk);
                    }).on('end', () => {
                        body = Buffer.concat(body).toString();

                        res.writeHead(200, {'Content-Type': 'application/json'});
                            let response = handleQuery(JSON.parse(body));
                        res.write(JSON.stringify(response));
                        res.end();
                    });
                }).listen(3987);
            }
        });
    }
});

function handleQuery(body){
    let result = null;

    if(body._id != null){
        result = set(first, body);
    }
    else{
        result = add(body);
    }

    if(first != null){
        first.save();
    }

    return result;
}

function set(current, body){
    if(body._id == undefined){
        return add(body).get();
    }
    else if(current._id === body._id){
        return current.set(body).get();
    }
    else if(current._next != null){
        set(current._next, body);
    }
    else{
        return add(body).get();
    }
}

function add(body){
    let newPawn = new Pawn(id);
    newPawn.set(body);
    id++;

    if(first == null){
        first = newPawn;
        last = newPawn;
    }

    last._next = newPawn;
    last = newPawn;
    return newPawn.get();
}