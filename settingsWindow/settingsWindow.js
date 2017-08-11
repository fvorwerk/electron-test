var $ = require('jquery');
require('hideshowpassword');
var fs = require("fs-sync");
var bcrypt = require('bcryptjs');


$('#password').hideShowPassword(false, true);





if(fs.exists('package.json')){
    var pkg = fs.readJSON('package.json');
};

var userSettings = {
        user: 'empty',
        password: 'empty'
        };



userSettings = fs.readJSON("./userSettings.json", "utf-8");



document.getElementById('username').value = (userSettings.user)
document.getElementById('password').value = (userSettings.password)







//Show and hide Password
$('#password').hideShowPassword(false, true);


//Store hashed password to userSettings.json
document.getElementById('saveSettings').onclick = () => {
    var username = document.getElementById('username').value
    console.log(username);
    var password = document.getElementById('password').value
    console.log(password);


    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);


        console.log(salt);
        console.log(hash);

        var userSettings = {
        user: username,
        password: hash
        };



    fs.write( "./userSettings.json", JSON.stringify( userSettings ), "utf8" );

};
