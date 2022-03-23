const validator = require('validator');
const readline = require('readline');

// console.log(validator.isEmail('dida@gmail.com'));

// console.log(validator.isMobilePhone('081318182524', 'id-ID'));

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

// rl.question('Masukkan Nama : ', (name) => {
//   rl.question('Masukkan No Handphone : ', (hp) => {
//       rl.question('Masukkan email anda : ', (email) => {
//           console.log(`Nama : ${name}`)
//           if(validator.isMobilePhone(hp) == true){
//               console.log(`No Handphone : ${hp}`)
//           } else {
//               console.log('Nomor Handphone Anda Salah')
//           } if(validator.isEmail(email) == true){
//               console.log(`Email anda : ${email}`)
//           } else {
//               console.log('Email anda salah')
//           } 
//           rl.close()
//         })
//     })  
// })


// rl.question('Masukkan Nama : ', (name) => {
//     rl.question('Masukkan No Handphone : ', (hp) => {
//         rl.question('Masukkan email anda : ', (email) => {
//             console.log(`Nama : ${name}`)
//             if (validator.isMobilePhone(hp) == true) {
//                 console.log(`No Handphone : ${hp}`)
//             } else if (validator.isEmail(email) == true) {
//                 console.log(`Email anda : ${email}`)
//             } else {
//                 console.log('No Handphone atau Email anda salah')
//             }
//             rl.close()
//         })
//     })  
// })

// rl.question('Masukkan Nama : ', (name) => {
//     rl.question('Masukkan No Handphone : ', (hp) => {
//         rl.question('Masukkan email anda : ', (email) => {
//             console.log(`Nama : ${name}`)
//                 switch (true) {
//                     case ( validator.isMobilePhone(hp) === true && validator.isEmail(email) === true):
//                         console.log(`No Handphone : ${hp}`)
//                         console.log(`Email anda : ${email}`)
//                         break;
//                     case ( validator.isMobilePhone(hp) === false && validator.isEmail(email) === false):
//                         console.log('No Handphone atau Email anda salah')
//                     default:
//                         break;
//                 }
//         })
//     })
// })


function main() {

    myName();  
    function myName(){
        rl.question(`Masukkan nama : `, (nama) => {
            return myHandphone();
        

        myHandphone();
            function myHandphone(){
                validator.isMobilePhone, rl.question(`Masukkan no handphone : `, (hp) => {
                if(!validator.isMobilePhone(hp)){
                    console.log('No handphone anda salah!')
                    myHandphone();
                } else {
                    return myEmail();
                }
            

            myEmail();
            function myEmail(){
                validator.isEmail, rl.question(`Masukkan email anda : `, (email) => {
                    if(!validator.isEmail(email)){
                        console.log('Email anda salah!')
                        myEmail()
                    } else {
                        return console.log(`Nama : ${nama}, No : ${hp}, Email anda : ${email}`)
                        rl.close()
                    }
                    })
                }
             })
            }
        })
    } 
 }

main();

// var name = ''
// var handphone = ''
// var mail = ''

// const myName = () => {
//     return new Promise((resolve, reject) => {
//         rl.question(`Masukkan nama anda : `, (nama) => {
//             name = nama
//             resolve()
//         })
//     })
// }

// const myHandphone = () => {
//     return new Promise((resolve, reject) => {
//         rl.question(`Masukkan nomor hp : `, (hp) => {
//             if(validator.isMobilePhone(hp) == false ){
//             console.log(`Nomor anda salah`)
//             myHandphone()
//             } else {
//                 handphone = hp
//                 myEmail()
//                 resolve()
//             }
           
//         })
//     })
// }

// const myEmail = () => {
//     return new Promise((resolve, reject) => {
//         rl.question(`Masukkan email anda : `, (email) => {
//             if(validator.isEmail(email) == false ){
//             console.log(`Email anda salah`)
//             myEmail()
//             } else {
//                 mail = email
//             console.log(`Nama : ${name}, Hp : ${handphone}, Email : ${mail}`)
//                 resolve()
//                 rl.close()
//             }
           
//         })
//     })
// }


// const main = async () => {
//     await myName()
//     await myHandphone()
//     await myEmail()
// }

// main()