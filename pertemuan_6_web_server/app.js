const fs = require('fs')
const http = require('http')
const port = 3000

const pageHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if(err){
            res.writeHead(404)
            res.write('Error : page not found')
        } else {
            res.write(data)
        }
        res.end()
    })
}


http
    .createServer((req, res) => {
        const url = req.url
        console.log(url)

        res.writeHead(200, {
            'Content-type' : 'text/html',
        })

        if(url === '/about'){
            pageHTML('./about.html', res)
        } else if (url === '/contact') {
            pageHTML('./contact.html', res)
        } else {
            pageHTML('./index.html', res)
        }

        // if(url === '/about'){
        //     // res.write('<h1>this is about page</h1>') //using html language
        //     fs.readFile('./about.html', (err, data) => {
        //         if(err){
        //             res.writeHead(404)
        //             res.write('Error : page not found')
        //         } else {
        //             res.write(data)
        //         }
        //         res.end()
        //     })
            
        // } else if (url === '/contact'){
        //     // res.write('<h2>this is contact page</h2>')
        //     fs.readFile('./contact.html', (err, data) => {
        //         if(err){
        //             res.writeHead(404)
        //             res.write('Error : page not found')
        //         } else {
        //             res.write(data)
        //         }
        //         res.end()
        //     })
        // } else {
        //     // res.write('Hello World!')
        //     fs.readFile('./index.html', (err, data) => {
        //         if(err){
        //             res.writeHead(404)
        //             res.write('Error : page not found')
        //         } else {
        //             res.write(data)
        //         }
        //         res.end()
        //     })    
        // }
        
        



})

    .listen(3000, () => {
        console.log('Server is listening on port 3000')
    })