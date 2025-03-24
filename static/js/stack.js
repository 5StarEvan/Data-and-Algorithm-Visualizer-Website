
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


const dataset = [];


function reset() {
    location.reload();
}


function pushValue() {
    const inputElement = document.getElementById("Input-Value");
    const inputValue = inputElement.value.trim();

    if (inputValue === "") {
        displayResult("Please enter a value!");
        return;
    }

    
    const numericValue = Number(inputValue);

    
    if (!isNaN(numericValue)) {
        dataset.push(numericValue); 
        inputElement.value = ""; 
        displayResult(`Added value ${numericValue} to the dataset`, true);
    } else {
        displayResult("Please enter a valid number!"); 
    }

    display(true); 
}


function pop() {
    if (dataset.length > 0) {
        const poppedValue = dataset.pop();
        displayResult(`Value ${poppedValue} has been popped!`);
        display(false, poppedValue); 
    } else {
        displayResult("Stack is empty!");
        display(); 
    }
}


const CONTAINER_DETAILS = {
    width: 300, 
    initialHeight: 250, 
    maxHeight: 0, 
    strokeWidth: 12, 
    rectWidth: 0,
    rectHeight: 35, 
    rectSpacing: 4, 
    bottomPadding: 8, 
    topPadding: 15 
};

function display(isPush = false, poppedValue = null) {
    
    const container = document.getElementById("stack-container");
    if (!container) return;
    
    
    container.innerHTML = "";
    
    
    CONTAINER_DETAILS.maxHeight = window.innerHeight * 0.6; 
    
    
    const requiredHeight = (dataset.length * (CONTAINER_DETAILS.rectHeight + CONTAINER_DETAILS.rectSpacing)) + 
                           CONTAINER_DETAILS.bottomPadding + CONTAINER_DETAILS.topPadding;
    
    
    const containerHeight = Math.max(
        CONTAINER_DETAILS.initialHeight,
        Math.min(requiredHeight, CONTAINER_DETAILS.maxHeight)
    );
    
    
    container.style.width = `${CONTAINER_DETAILS.width}px`;
    container.style.height = `${containerHeight}px`;
    container.style.border = `${CONTAINER_DETAILS.strokeWidth}px solid #FFFFFF`; 
    container.style.borderTop = "none"; 
    container.style.display = "flex";
    container.style.flexDirection = "column-reverse"; 
    container.style.alignItems = "center";
    container.style.padding = `0 10px ${CONTAINER_DETAILS.bottomPadding}px 10px`;
    container.style.boxSizing = "border-box";
    container.style.position = "absolute"; 
    container.style.bottom = "30px"; 
    container.style.left = "50%"; 
    container.style.transform = "translateX(-50%)"; 
    container.style.overflow = "hidden"; 
    container.style.transition = "height 0.3s ease-out";
    container.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; 
    container.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.5)"; 
    container.style.zIndex = "10"; 
    
    
    let isOverflowing = requiredHeight > CONTAINER_DETAILS.maxHeight;
    
    
    if (isOverflowing) {
        
        const availableHeight = CONTAINER_DETAILS.maxHeight - CONTAINER_DETAILS.bottomPadding - CONTAINER_DETAILS.topPadding;
        const totalItems = dataset.length;
        const heightPerItem = availableHeight / totalItems;
        
        
        const scaleFactor = heightPerItem / (CONTAINER_DETAILS.rectHeight + CONTAINER_DETAILS.rectSpacing);
        CONTAINER_DETAILS.rectHeight = Math.max(18, Math.floor(CONTAINER_DETAILS.rectHeight * scaleFactor)); 
        CONTAINER_DETAILS.rectSpacing = Math.max(2, Math.floor(CONTAINER_DETAILS.rectSpacing * scaleFactor));
    }
    
    
    CONTAINER_DETAILS.rectWidth = CONTAINER_DETAILS.width - 30; 
    
    
    dataset.forEach((value, index) => {
        const rect = document.createElement("div");
        rect.className = "stack-item";
        rect.textContent = value;
        rect.style.width = `${CONTAINER_DETAILS.rectWidth}px`;
        rect.style.height = `${CONTAINER_DETAILS.rectHeight}px`;
        rect.style.backgroundColor = "#3498db"; 
        rect.style.color = "white";
        rect.style.display = "flex";
        rect.style.alignItems = "center";
        rect.style.justifyContent = "center";
        rect.style.marginBottom = `${CONTAINER_DETAILS.rectSpacing}px`;
        rect.style.borderRadius = "4px"; 
        rect.style.fontWeight = "bold";
        rect.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)"; 
        rect.style.transition = "height 0.3s ease-out, margin-bottom 0.3s ease-out";
        
        
        if (isPush && index === dataset.length - 1) {
            rect.style.animation = "pushAnimation 0.5s ease-out";
        }
        
        container.appendChild(rect);
    });
    
    
    if (poppedValue !== null) {
        const poppedRect = document.createElement("div");
        poppedRect.className = "stack-item popped";
        poppedRect.textContent = poppedValue;
        poppedRect.style.width = `${CONTAINER_DETAILS.rectWidth}px`;
        poppedRect.style.height = `${CONTAINER_DETAILS.rectHeight}px`;
        poppedRect.style.backgroundColor = "#2980b9"; 
        poppedRect.style.color = "white";
        poppedRect.style.display = "flex";
        poppedRect.style.alignItems = "center";
        poppedRect.style.justifyContent = "center";
        poppedRect.style.marginBottom = `${CONTAINER_DETAILS.rectSpacing}px`;
        poppedRect.style.borderRadius = "4px"; 
        poppedRect.style.fontWeight = "bold";
        poppedRect.style.position = "absolute";
        poppedRect.style.bottom = `${dataset.length * (CONTAINER_DETAILS.rectHeight + CONTAINER_DETAILS.rectSpacing) + CONTAINER_DETAILS.bottomPadding}px`;
        poppedRect.style.animation = "popAnimation 0.8s ease-out forwards";
        poppedRect.style.zIndex = "10";
        
        container.appendChild(poppedRect);
    }
    
    
    if (!document.getElementById("stack-animations")) {
        const styleSheet = document.createElement("style");
        styleSheet.id = "stack-animations";
        styleSheet.textContent = `
            @keyframes pushAnimation {
                0% { 
                    transform: translateY(-80px); /* Reduced from -100px */
                    opacity: 0;
                }
                100% { 
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes popAnimation {
                0% { 
                    transform: translateY(0);
                    opacity: 1;
                }
                60% {
                    transform: translateY(-40px); /* Reduced from -50px */
                    opacity: 1;
                }
                100% { 
                    transform: translateY(-80px); /* Reduced from -100px */
                    opacity: 0;
                }
            }
            
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            #addedElements {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 100;
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: bold;
                border: 2px solid;
                max-width: 80%;
                text-align: center;
            }
            
            #stack-container {
                margin: 0 auto;
            }
            
            body {
                min-height: 100vh;
                margin: 0;
                padding: 0;
                position: relative;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    
    if (dataset.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.textContent = "Stack is empty";
        emptyMessage.style.padding = "8px"; 
        emptyMessage.style.color = "#7f8c8d";
        emptyMessage.style.fontStyle = "italic";
        container.appendChild(emptyMessage);
    }
}


window.onload = function() {
    
    if (!document.getElementById("stack-container")) {
        const stackContainer = document.createElement("div");
        stackContainer.id = "stack-container";
        document.body.appendChild(stackContainer);
    }
    
    
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.position = "relative";
    
    display();
};