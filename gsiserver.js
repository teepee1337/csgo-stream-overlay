http = require('http');
fs = require('fs');

port = 3333;
host = '127.0.0.1';

global.body = '';

server = http.createServer( function(req, res) {

    if (req.method == 'POST') {
        console.log("Handling POST request");
        res.writeHead(200, {'Content-Type': 'text/html'});

        global.body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            res.end( '' );
        });
    }
    if (req.method == "GET") {
       console.log("Handling GET request");
       res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
       res.setHeader('Access-Control-Allow-Origin', '*');
       res.writeHead(200, {'Content-Type': 'text/json'});
       if (body === undefined) {
	body = ' ';
	res.end(body);
       } else {
	res.end(body);
       }
    }
    else
    {
        console.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
		var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }

});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);