const validator = require('validator');
const readline = require('readline');

// console.log(validator.isEmail('dida@gmail.com'));

// console.log(validator.isMobilePhone('081318182524', 'id-ID'));

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.question('Masukkan Nama : ', (name) => {
  rl.question('Masukkan No Handphone : ', (hp) => {
      rl.question('Masukkan email anda : ', (email) => {
          console.log(`Nama : ${name}`)
          if(validator.isMobilePhone(hp) == true){
              console.log(`No Handphone : ${hp}`)
          } else {
              console.log('Nomor Handphone Anda Salah')
          } if(validator.isEmail(email) == true){
              console.log(`Email anda : ${email}`)
          } else {
              console.log('Email anda salah')
          } 
          rl.close()
        })
    })  
})