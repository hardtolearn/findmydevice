// Refer to UI elements
var button = document.getElementById('myButton');
var txtInput = document.getElementById('myTextInput');

// Bind client event of the buton with an event listener
button.addEventListener('click', function(){
    var text = txtInput.value;
    // show alert box with this text
    alert(text);
});