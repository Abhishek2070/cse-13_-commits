let display = document.getElementById("display");

function add(value){
    display.value += value;
}

function clr(){
    display.value = "";
}

function del(){
    display.value = display.value.slice(0,-1);
}

function equal(){
    try{
        display.value = eval(display.value);
    }catch{
        display.value = "Error";
    }
}