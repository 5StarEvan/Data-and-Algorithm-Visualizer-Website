
function home() {
    window.location.href = "home.html";
}

function list(){
    window.location.href = "list.html";
}


function displayResult(message, isSuccess = false) {
    const elementData = document.getElementById("addedElements");
    elementData.textContent = message;
    elementData.style.display = "block";
    
    
    if (isSuccess) {
        elementData.style.borderColor = "#00CC66";
        elementData.style.backgroundColor = "rgba(0, 204, 102, 0.2)";
    } else {
        elementData.style.borderColor = "#FF9500";
        elementData.style.backgroundColor = "rgba(255, 149, 0, 0.2)";
    }
    
    
    elementData.style.animation = "none";
    setTimeout(() => {
        elementData.style.animation = "fadeIn 0.5s ease-in-out";
    }, 10);
}

dataset = [];

function startAnimation(){

}

function stopAnimation(){

}

function display() {
    
  
}


window.onload = function() {
    
    display();
};