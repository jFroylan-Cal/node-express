
import http from 'http';
import fs from 'fs';

const server = http.createServer((request, response) => {
    console.log(request.url);
    // response.writeHead(200, { 'Content-Type': 'text/html' });
    // response.write(`<h1>URl ${request.url}</h1>`);
    // response.end();

    // const data = { name: 'John Doe', age: 30, city: 'New York' };
    // response.writeHead(200, { 'Content-Type': 'application/json' });
    // response.end(JSON.stringify(data));

    if (request.url === '/') {
        const htmlFile = fs.readFileSync('./src/public/index.html', 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(htmlFile);
        return;
    } 
    
    if (request.url?.endsWith('.js')) {
        response.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    else if (request.url?.endsWith('.css')) {
        response.writeHead(200, { 'Content-Type': 'text/css' });
    }

    const responseContent = fs.readFileSync(`./src/public/${request.url}`, 'utf-8');
    response.end(responseContent);

});

server.listen(8080, () => {
    console.log('Server running on port 3000');
});

