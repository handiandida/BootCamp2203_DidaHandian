const fs = require('fs')
// const readline = require('readline')

//untuk validator harus di install terlebih dahulu karena tidak global
const validator = require('validator')
const dirPath = './data'
const dataPath = './data/contacts.json'

// const rl = readline.createInterface({
//     input : process.stdin,
//     output : process.stdout
// })

//mengecek directory apakah sudah ada atau belum
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

//mengecek file apakah sudah ada atau belum
if (!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'{}','utf-8')
}

//membuat fungsi bertanya
// const questions = (ask) => {

//     //cara untuk menangani async agar tidak stuck di callback-hell
//     return new Promise((resolve,reject) => {
//         rl.question(ask, (input) => {

//             //return value
//             resolve(input)
//         })
//     })
// }

const saveContact = (name, email, mobile) => {

        //membuat variabel menjadi object
        const contact = {name, email, mobile}

        //membaca file dari json
        const file = fs.readFileSync('data/contacts.json','utf-8')

        // membuat file agar menjadi json
        const contacts = JSON.parse(file)

        //validasi agar nama tidak ada yang sama
        const duplicate = contacts.find((contact) => contact.name === name)
            if(duplicate){
                console.log('Contact name is already recorded. Use another contact name')
                return false
            }
        
            //validasi untuk nomor hp apakah sudah benar sesuai dengan ketentuan kode negara
            if(!validator.isMobilePhone(mobile,'id-ID')){
                console.log('Nomor anda salah!')
                return false
            }

            //validasi untuk email atau if didalam if
            if(email){
                if(!validator.isEmail(email)){
                    console.log('Email anda salah!')
                    return false
                }
            }

        //untuk mengirim data ke dalam json
        contacts.push(contact)

        //membuat file json dan cek terlebih dahulu agar string dapat diterima 
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
        console.log('Terima kasih sudah memaskkan data!')
        // rl.close()
}
module.exports = {
    saveContact 
    // questions
}