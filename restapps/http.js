const http = require('http');  
http.createServer((req, res) => {
    res.write('Hello World');  
    res.end();  
    console.log('Server running on port 3000');  
}).listen(3000, () => {  
    console.log('Server running on port 3000');
});
