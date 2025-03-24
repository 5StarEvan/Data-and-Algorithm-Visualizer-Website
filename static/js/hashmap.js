
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

const dataset = new Map();
dataset.set('Name' , ' Hello');



function reset() {
    location.reload();
}


function putValue(){ 

    const KeyInput = document.getElementById("Key-Value");
    const ValueInput = document.getElementById("Value-Value");

    if (KeyInput.value === "" || ValueInput.value === ""){
        displayResult("Please Enter Key and Value to be Added!");
    }
    else{
        displayResult(`Added Key ${KeyInput.value} and ${ValueInput.value} to the HashMap as Key-Value Pair`, true);
        dataset.set(KeyInput.value,ValueInput.value);
    }
    
   
    display();

}

function removeValue(){

}

function display(){

    d3.select(".visual").selectAll("svg").remove();

    
    const visualContainer = document.querySelector(".visual");
    const visualWidth = visualContainer.clientWidth; 
    const visualHeight = visualContainer.clientHeight; 
    
    const visualCanvas = d3.select(".visual")
        .append("svg")
        .attr("width" , visualWidth)
        .attr("height" , visualHeight);

    function updateLines(){

        
        visualCanvas.selectAll("line").remove(); 
    }


}

window.onload = function(){
    display();
}