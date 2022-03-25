// const fs = require('fs')
// const readline = require('readline')

// const rl = readline.createInterface({
//     input : process.stdin,
//     output : process.stdout
// })

// //mengecek directory apakah sudah ada atau belum
// const dirPath = './data'
// if (!fs.existsSync(dirPath)){
//     fs.mkdirSync(dirPath)
// }

// //mengecek file apakah sudah ada atau belum
// const dataPath = './data/contacts.json'
// if (!fs.existsSync(dataPath)){
//     fs.writeFileSync(dataPath,'{}','utf-8')
// }

// //membuat fungsi bertanya
// const question = (ask) => {

//     //cara untuk menangani async agar tidak stuck di callback-hell
//     return new Promise((resolve,reject) => {
//         rl.question(ask, (input) => {

//             //return value
//             resolve(input)
//         })
//     })
// }

// const main = async () => {
//     const name = await question('What is your name ? ')
//     const mobile = await question('your mobile number ? ')
//     const email = await question('your email ? ')

//         //membuat variabel menjadi object
//         const contact = {name,mobile,email}

//         //membaca file dari json
//         const file = fs.readFileSync('data/contacts.json','utf-8')

//         // membuat file agar menjadi json
//         const contacts = JSON.parse(file)

//         //untuk mengirim data ke dalam json
//         contacts.push(contact)

//         //membuat file json dan cek terlebih dahulu agar string dapat diterima 
//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
//         console.log('Terima kasih sudah memaskkan data!')
//         rl.close()

// }

// //memanggil fungsi
// main()

// const contacts = require('./contacts')

// const main = async () => {
//     const name = await contacts.questions('What is your name ? ')
//     const email = await contacts.questions('your email address ? ')
//     const mobile = await contacts.questions('your mobile number ? ')

//     contacts.saveContact(name,email,mobile)
// }
// main()

//memanggil module yargs
const yargs = require('yargs')
const contacts = require('./contacts')

//comand untuk menambahkan data
yargs.command({
    command: 'add',
    describe: 'add new contact',

    //didalam comment app menerima variabel
    builder: {
        name : {
            describe : 'Contact Name',
            //require data
            demandOption : true,
            type : 'string',
        },
        email : {
            describe : 'Contact Email',
            demandOption : false,
            type : 'string'
        },
        mobile : {
            describe : 'Contact Mobile Phone Number',
            demandOption : true,
            type : 'string',
        },
    },
    //argv = nilai return 
    // handler(argv) {
    //     const contact = {
    //         name : argv.name,   //argumen mengambil dari inputan ke yargs dan diambil oleh argv
    //         email : argv.email,
    //         mobile : argv.mobile,
    //     }
    //     console.log(contact) //keluaran
    // }
    
    handler(argv){
        contacts.saveContact(argv.name,argv.email,argv.mobile)
    }
})

//comand untuk list data
yargs.command({
    command : 'list',
    describe : 'see contact list',

    handler(){
        contacts.listContact()
    }
})

//comand untuk detail data
yargs.command({
    command : 'detail',
    describe : 'see detail contact',

    builder : {
        name : {
            describe : 'Contact Name',
            //require data
            demandOption : true,
            type : 'string',
        }
    },

    handler(argv){
        contacts.detailContact(argv.name)
    }
})

//comand untuk menghapus data
yargs.command({
    command : 'delete',
    describe : 'contact deleted!',

    builder : {
        name : {
            describe : 'Contact Name',
            //require data
            demandOption : true,
            type : 'string',
        }
    },

    handler(argv){
        contacts.deleteContact(argv.name)
    }
})


//parsing untuk mengambil yargs
yargs.parse()