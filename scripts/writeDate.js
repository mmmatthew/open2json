var fs = require('fs');


function writeDateToFile() {
    var date = new Date();
    
    // write data to file
    fs.writeFile('scripts/datetime.txt', date, 'utf8', ()=>{console.log('written')});
}

// run function every 5 sec
setInterval(writeDateToFile, 5000);