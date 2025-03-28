
function home() {
    window.location.href = "home.html";
}

function list(){
    window.location.href = "list.html";
}


function displayR(message, isSuccess = false) {
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


const queue = [];


function reset() {
    location.reload();
}


function addValue() {
    const inputElement = document.getElementById("Input-Value");
    const inputValue = inputElement.value.trim();

    if (inputValue === "") {
        displayR("Please enter a value!");
        return;
    }

    
    const numericValue = Number(inputValue);

    
    if (!isNaN(numericValue)) {
        queue.push(numericValue); 
        inputElement.value = ""; 
        displayR(`Added value ${numericValue} to the queue`, true);
    } else {
        displayR("Please enter a valid number!"); 
    }

    display(true); 
}


function removeValue() {
    if (queue.length > 0) {
        const dequeuedValue = queue.shift(); 
        displayR(`Value ${dequeuedValue} has been dequeued!`);
        display(false, dequeuedValue); 
    } else {
        displayR("Queue is empty!");
        display(); 
    }
}


const containerDetails = { width: 600,  height: 100,  maxWidth: 0,  strokeWidth: 10, rectWidth: 60,  rectHeight: 60, rectSpacing: 10,  leftPadding: 20, rightPadding: 20 }

function display(isEnqueue = false, dequeuedValue = null) {
    
    const container = document.getElementById("queue-container");
    if (!container){
        return;
    } 
    
    
    container.innerHTML = "";
    containerDetails.maxWidth = window.innerWidth * 0.75; 
    const requiredWidth = (queue.length * (containerDetails.rectWidth + containerDetails.rectSpacing)) + 
                          containerDetails.leftPadding + containerDetails.rightPadding;
    const containerWidth = Math.min(Math.max(600, requiredWidth), containerDetails.maxWidth);
    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerDetails.height}px`;
    container.style.border = `${containerDetails.strokeWidth}px solid #FFFFFF`; 
    container.style.borderLeft = "none"; 
    container.style.borderRight = "none"; 
    container.style.display = "flex";
    container.style.flexDirection = "row"; 
    container.style.justifyContent = "center"; 
    container.style.alignItems = "center"; 
    container.style.padding = `0 ${containerDetails.rightPadding}px 0 ${containerDetails.leftPadding}px`;
    container.style.boxSizing = "border-box";
    container.style.position = "absolute"; 
    container.style.top = "50%"; 
    container.style.left = "50%"; 
    container.style.transform = "translate(-50%, -50%)"; 
    container.style.overflow = "hidden"; 
    container.style.transition = "width 0.3s ease-out";
    container.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; 
    container.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.5)"; 
    container.style.zIndex = "10"; 
    
    
    let Overflowing = requiredWidth > containerDetails.maxWidth;
    
    
    if (Overflowing) {
        
        const availableWidth = containerDetails.maxWidth - containerDetails.leftPadding - containerDetails.rightPadding;
        const totalItems = queue.length;
        const widthPerItem = availableWidth / totalItems;
        const scaleFactor = widthPerItem / (containerDetails.rectWidth + containerDetails.rectSpacing);
        containerDetails.rectWidth = Math.max(30, Math.floor(containerDetails.rectWidth * scaleFactor)); 
        containerDetails.rectSpacing = Math.max(5, Math.floor(containerDetails.rectSpacing * scaleFactor)); 
    }
    
    
    const exitLabel = document.createElement("div");
    exitLabel.textContent = "EXIT";
    exitLabel.style.position = "absolute";
    exitLabel.style.left = "-40px"; 
    exitLabel.style.color = "white";
    exitLabel.style.fontWeight = "bold";
    exitLabel.style.fontSize = "14px"; 
    container.appendChild(exitLabel);
    
    const entranceLabel = document.createElement("div");
    entranceLabel.textContent = "ENTRANCE";
    entranceLabel.style.position = "absolute";
    entranceLabel.style.right = "-80px"; 
    entranceLabel.style.color = "white";
    entranceLabel.style.fontWeight = "bold";
    entranceLabel.style.fontSize = "14px"; 
    container.appendChild(entranceLabel);
    
    
    const queueItemsWrapper = document.createElement("div");
    queueItemsWrapper.style.display = "flex";
    queueItemsWrapper.style.flexDirection = "row";
    queueItemsWrapper.style.justifyContent = "center"; 
    queueItemsWrapper.style.alignItems = "center"; 
    queueItemsWrapper.style.overflow = "hidden"; 
    queueItemsWrapper.style.width = "100%";
    queueItemsWrapper.style.height = "100%";
    queueItemsWrapper.style.position = "relative";
    container.appendChild(queueItemsWrapper);
    
    
    queue.forEach((value, index) => {
        const rect = document.createElement("div");
        rect.className = "queue-item";
        rect.textContent = value;
        rect.style.width = `${containerDetails.rectWidth}px`;
        rect.style.height = `${containerDetails.rectHeight}px`;
        rect.style.backgroundColor = "#3498db"; 
        rect.style.color = "white";
        rect.style.display = "flex";
        rect.style.alignItems = "center";
        rect.style.justifyContent = "center";
        rect.style.marginRight = `${containerDetails.rectSpacing}px`;
        rect.style.borderRadius = "6px"; 
        rect.style.fontWeight = "bold";
        rect.style.fontSize = "18px"; 
        rect.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)"; 
        rect.style.transition = "all 0.3s ease-out";
        rect.style.flexShrink = "0"; 
        
        
        if (index === 0 && queue.length > 0) {
            rect.style.border = "2px solid #FF9500"; 
            rect.style.boxShadow = "0 0 10px rgba(255, 149, 0, 0.6)"; 
        }
        
        
        if (isEnqueue && index === queue.length - 1) {
            rect.style.animation = "enqueueAnimation 0.5s ease-out";
        }
        
        queueItemsWrapper.appendChild(rect);
    });
    
    
    if (dequeuedValue !== null) {
        
        const dequeuedContainer = document.createElement("div");
        dequeuedContainer.style.position = "absolute";
        dequeuedContainer.style.left = "0";
        dequeuedContainer.style.top = "0";
        dequeuedContainer.style.width = `${containerWidth}px`; 
        dequeuedContainer.style.height = "100%";
        dequeuedContainer.style.display = "flex";
        dequeuedContainer.style.alignItems = "center"; 
        dequeuedContainer.style.overflow = "hidden"; 
        dequeuedContainer.style.pointerEvents = "none";
        dequeuedContainer.style.zIndex = "20"; 
        container.appendChild(dequeuedContainer);
        const dequeuedRect = document.createElement("div");
        dequeuedRect.className = "queue-item dequeued";
        dequeuedRect.textContent = dequeuedValue;
        dequeuedRect.style.width = `${containerDetails.rectWidth}px`;
        dequeuedRect.style.height = `${containerDetails.rectHeight}px`;
        dequeuedRect.style.backgroundColor = "#2980b9"; 
        dequeuedRect.style.color = "white";
        dequeuedRect.style.display = "flex";
        dequeuedRect.style.alignItems = "center";
        dequeuedRect.style.justifyContent = "center";
        dequeuedRect.style.position = "absolute";
        dequeuedRect.style.top = "50%";
        dequeuedRect.style.transform = "translateY(-50%)"; 
        dequeuedRect.style.left = `${containerDetails.leftPadding}px`; 
        dequeuedRect.style.borderRadius = "6px"; 
        dequeuedRect.style.fontWeight = "bold";
        dequeuedRect.style.fontSize = "18px"; 
        dequeuedRect.style.border = "2px solid #FF9500"; 
        dequeuedRect.style.boxShadow = "0 0 10px rgba(255, 149, 0, 0.6)"; 
        dequeuedRect.style.animation = "improvedDequeueAnimation 1.2s ease-in-out forwards";  
        dequeuedContainer.appendChild(dequeuedRect);
    }
    
    
    if (!document.getElementById("queue-animations")) {
        const styleSheet = document.createElement("style");
        styleSheet.id = "queue-animations";
        styleSheet.textContent = `
            @keyframes enqueueAnimation {
                0% { 
                    transform: translateX(60px); /* Reduced from 80px */
                    opacity: 0;
                }
                100% { 
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes improvedDequeueAnimation {
                0% { 
                    transform: translateY(-50%) scale(1);
                    opacity: 1;
                    left: ${containerDetails.leftPadding}px;
                    box-shadow: 0 0 10px rgba(255, 149, 0, 0.6);
                }
                10% {
                    transform: translateY(-50%) scale(1.1);
                    opacity: 1;
                    left: ${containerDetails.leftPadding}px;
                    box-shadow: 0 0 15px rgba(255, 149, 0, 0.8);
                }
                30% {
                    transform: translateY(-50%) scale(1);
                    opacity: 1;
                    left: ${containerDetails.leftPadding - 10}px;
                    box-shadow: 0 0 10px rgba(255, 149, 0, 0.6);
                }
                60% {
                    transform: translateY(-50%) scale(0.95);
                    opacity: 0.8;
                    left: ${containerDetails.leftPadding - 40}px;
                    box-shadow: 0 0 8px rgba(255, 149, 0, 0.4);
                }
                100% { 
                    transform: translateY(-50%) scale(0.8) rotate(-10deg);
                    opacity: 0;
                    left: -${containerDetails.rectWidth + 20}px;
                    box-shadow: 0 0 0 rgba(255, 149, 0, 0);
                }
    }   
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            #addedElements {
                position: fixed;
                top: 15px; /* Reduced from 20px */
                left: 50%;
                transform: translateX(-50%);
                z-index: 100;
                padding: 10px 20px; /* Reduced from 15px 25px */
                border-radius: 6px; /* Reduced from 8px */
                font-weight: bold;
                font-size: 16px; /* Reduced from 18px */
                border: 2px solid; /* Reduced from 3px */
                max-width: 80%;
                text-align: center;
            }
            
            #queue-container {
                margin: 0 auto;
                position: relative;
            }
            
            .queue-item {
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            }
            
            body {
                min-height: 100vh;
                margin: 0;
                padding: 0;
                position: relative;
            }
            
            /* Add button styling - smaller buttons */
            button {
                padding: 6px 12px; /* Smaller padding */
                font-size: 14px; /* Smaller font */
                border-radius: 4px; /* Smaller radius */
                margin: 5px; /* Smaller margin */
            }
            
            input {
                padding: 5px 10px; /* Smaller padding */
                font-size: 14px; /* Smaller font */
                border-radius: 4px; /* Smaller radius */
            }
        `;

        document.head.appendChild(styleSheet);
    }
    
    
    if (queue.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.textContent = "Queue is empty";
        emptyMessage.style.padding = "8px"; 
        emptyMessage.style.color = "#ffffff";
        emptyMessage.style.fontStyle = "italic";
        emptyMessage.style.fontSize = "16px"; 
        queueItemsWrapper.appendChild(emptyMessage);
    }
}


window.onload = function() {
    
    if (!document.getElementById("queue-container")) {  
        
        const queueContainer = document.createElement("div"); 
        queueContainer.id = "queue-container";
        document.body.appendChild(queueContainer);

    }
    
    
    if (!document.getElementById("addedElements")) {

        const elementData = document.createElement("div");
        elementData.id = "addedElements";
        elementData.style.display = "none";
        document.body.appendChild(elementData);

    }
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.position = "relative";
    
    display();
};


window.addEventListener('resize', function() { display(); });