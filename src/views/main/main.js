const http = require('http')

const fs = require('fs').promises


http.createServer(async (req, res) => {
    try{
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFront.html')
                res.writeHead(200, {'content-Type' : 'text/html; charset=utf-8'})
                return res.end(data)
            }else if(req.url === '/about'){
                const data = await fs.readFile('./about.html')
                res.writeHead(200, {'content-Type' : 'text/html; charset=utf-8'})
                return req.end(data)
            }else if(req.url === '/users'){
                res.writeHead(201, {'content-Type' : 'text/html; charset=utf-8'})
                return res.end(JSON.stringify(users))
            }
        }
        try{
            const data = await fs.readFile(`.${req.url}`)
            return res.end(data)
        }
    }
    res.writeHead(200, {'content-Type' : 'text/html; charset=utf-8'})
    const data = await fs.readFile('main.html')
    res.end(data)
})
.listen('http://127.0.0.1:5500')

server.on('listening', ()=>{
    console.log('서버 대기중입니다.')
})
server.on('error', (error)=>{
    console.error('error')
})