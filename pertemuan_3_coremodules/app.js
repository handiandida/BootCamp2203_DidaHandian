//core module
//file system

// const fs = require('fs')

// fs.readFile('test.txt', 'utf-8', (err,data) => {
//     if (err) throw err;
//     console.log(data);
// })

const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.question('What is your name ? ', (name) => {
    rl.question('Your mobile number ? ', (mobile) => {
        rl.question('What is your email ? ', (email) => {  
    console.log(`Thank you ${name}, your mobile number is ${mobile}, your email is ${email}`);
    rl.close();
        })
    })
})