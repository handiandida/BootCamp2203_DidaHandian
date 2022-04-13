const fs = require('fs')
// const client = require('pg/lib/native/client')

//untuk validator harus di install terlebih dahulu karena tidak global
const validator = require('validator')
const dirPath = './data'
const dataPath = './data/contacts.json'


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

const loadContact = () => {
    //membaca file dari json
    const file = fs.readFileSync('data/contacts.json','utf-8')

    // membuat file agar menjadi json
    const contacts = JSON.parse(file)

    return contacts
}



const saveContact = (name, email, mobile) => {

        //membuat variabel menjadi object
        const contact = {name, email, mobile}

        const contacts = loadContact()

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

            //validasi untuk email atau if didalam if (check email format is true)
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

const listContact = () => {
    //memanggil fungsi loadContact
    const contacts = loadContact()
    console.log('Contact list : ')
    //search data menggunakan forEach
    contacts.forEach((contact, i) => {
        console.log(`${i+1}.${contact.name}-${contact.mobile}`) 
    });
}


//funsgi untuk detail contact
const detailContact = (name) => {
    const contacts = loadContact()

    //fungsi mencari nama
    const contact = contacts.find((contact) => contact.name === name)
    
    //validasi apakah nama ada atau tidak
    if(!contact) {
        console.log(`${name} tidak ditemukan`)
        return false
    }

    console.log(contact.name)
    console.log(contact.mobile)

    //karena di app.js false maka harus di kasih if agar email tidak undefined
    if(contact.email){
    console.log(contact.email)
    }
}

//fungsi untuk delete contact
const deleteContact = (name) => {
    const contacts = loadContact()

    //membuat fungsi baru dengan menggunakan filter
    const newContatcs = contacts.filter((contact) => contact.name !== name)

    //validasi bahwa newContacs itu sama dengan contacts
    if(!contacts.length === newContatcs.length) {
        console.log(`${name} tidak ditemukan`)
        return false
    }

    //untuk bisa menghapus data dari json
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContatcs))
        console.log(`${name} Data sudah dihapus! `)
}

const findContact = (name) => {
    const contacts = loadContact()

    //fungsi mencari nama
    const contact = contacts.find((contact) => contact.name === name)

    return contact
}

//fungsi untuk menyimpan contact
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

//fungsi untuk menambhakan contact
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

//fungsi untuk mengecek duplikat nama
const duplicateContact = (name) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.name === name)
}

//fungsi untuk delete contact
const destroyContact = (name) => {
    const contacts = loadContact()
    const contactNew = contacts.filter((contact) => contact.name !== name)
    saveContacts(contactNew)
}

//fungsi update contacts
const updateContact = (editContacts) => {
    const contacts = loadContact()
    const contactfilter = contacts.filter((contact) => contact.name !== editContacts.oldname)
    delete editContacts.oldname
    contactfilter.push(editContacts)
    saveContacts(contactfilter)
}




//untuk bisa di panggil
module.exports = {
    loadContact,
    findContact,
    addContact,
    duplicateContact,
    destroyContact,
    updateContact
}