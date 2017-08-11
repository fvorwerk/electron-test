var $ = require('jquery');
require('hideshowpassword');
var fs = require("fs-sync");
const hasha = require('hasha');
const remote = require('electron').remote;

//Hide and Show Password
$('#pin').hideShowPassword(false, true);


var pin = ""

if(fs.exists('package.json')){
    var pkg = fs.readJSON('package.json');
};

//Numpad
$('button').click(function() {
    $('#pin')[0].value += $(this).val();
    pin = document.getElementById('pin').value;
});

//event for backspace button
var backspace = document.getElementById('backspace')
backspace.addEventListener('click', () => {
    pin = pin.slice(0, -1)
    document.getElementById('pin').value = pin
}, false)


//save button
var save = document.getElementById('save')
save.addEventListener('click', () => {

    if (pin.length < 4) {
        alert("Bitte geben Sie eine passende Pin ein!")
        document.getElementById('pin').value = ""
    } else {
        savePinhash();
    }

    
}, false)


//validate pin



$(document).ready(function() {
    $("#pin").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});


//save hash
function savePinhash(){

    var result = {
    hash: hasha(pin)
    }

    fs.write( "./userPin.json", JSON.stringify( result ), "utf8" );

    if (checkPin(true)) {
        var answer = confirm("Pin wurde erfolgreich gespeichert")
        if (answer) {
            var window = remote.getCurrentWindow();
            window.close();
            
        }
        
    }  else{

        alert("Fehler")
    }
} 



function checkPin() {
    var check = fs.readJSON("./userPin.json", "utf-8")
    var checkHash = (check.hash)

    var generatedHash = hasha(pin)

    if ( generatedHash == checkHash ) {
        return true
    }

}

