var readline = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
});

readline.question('Masukkan nama : ', nama => {
    readline.question('Masukkan umur : ', umur => {
        readline.question('Masukkan No Handphone : ', hp => {
    console.log(`Hi ${nama}`);
    console.log(`Umur ${umur} tahun`);
    console.log(`No Hp ${hp}`);

    console.log(`Nama Saya ${nama}, Saya berusia ${umur} tahun, dan Nomor Handphone saya ${hp}`);
    readline.close();
        })
    })
})



