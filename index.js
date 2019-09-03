const http = require('http');
const Pawn = require('./pawn');

let first = null;
let last = null;
let id = 0;

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
}).listen(8080);

function handleQuery(body){
    if(first != null){
        return set(first, body);
    }
    else{
        return add(body);
    }
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

//Saving