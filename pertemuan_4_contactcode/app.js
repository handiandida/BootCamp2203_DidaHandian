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

const contacts = require('./contacts')

const main = async () => {
    const name = await contacts.questions('What is your name ? ')
    const email = await contacts.questions('your email address ? ')
    const mobile = await contacts.questions('your mobile number ? ')

    contacts.saveContact(name,email,mobile)
}
main()