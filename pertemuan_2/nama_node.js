var readline = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
});

readline.question('Siapa Anda? ', nama=> {
    console.log(`Hi ${nama}`);
    readline.close();
});