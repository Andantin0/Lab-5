document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".editable-header");
    const block5 = document.querySelector(".editable-text");
    const swapButton = document.getElementById("swapButton");

    function swapTexts() {
        const headerContent = header.innerHTML;
        const block5Content = block5.innerHTML;

        header.innerHTML = block5Content;
        block5.innerHTML = headerContent;
    }

    swapButton.addEventListener("click", swapTexts);
});

document.addEventListener("DOMContentLoaded", () => {
    const editableList = document.getElementById("editableList");

    editableList.addEventListener("dblclick", (event) => {
        if (event.target.tagName === "LI") {
            const listItemText = event.target.textContent.trim();
            let targetBlock;

            if (listItemText.includes("header")) {
                targetBlock = document.querySelector(".editable-header"); 
            } else if (listItemText.includes("блоці 3")) {
                targetBlock = document.getElementById("minecraftText"); 
            } else if (listItemText.includes("блоці 5")) {
                targetBlock = document.querySelector(".block5 .editable-text"); 
            } else if (listItemText.includes("блоці 4")) {
                targetBlock = document.querySelector(".block4 button");
            }

            if (targetBlock) {
                makeEditable(targetBlock, listItemText.includes("блоці 4"));
            }
        }
    });

    function makeEditable(targetBlock, isButton = false) {
        if (targetBlock.querySelector(".edit-container")) return;

        const initialText = targetBlock.textContent.trim();
        const savedText = localStorage.getItem(`block-${targetBlock.className || targetBlock.id}`) || initialText;

        const editContainer = document.createElement("div");
        editContainer.className = "edit-container";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = savedText;

        const saveButton = document.createElement("button");
        saveButton.textContent = "Зберегти";

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Скасувати";

        saveButton.addEventListener("click", () => {
            const newText = inputField.value.trim();
            localStorage.setItem(`block-${targetBlock.className || targetBlock.id}`, newText);
            
            if (isButton) {
                targetBlock.textContent = newText;
            } else {
                targetBlock.textContent = newText;
            }

            editContainer.remove();
        });

        cancelButton.addEventListener("click", () => {
            targetBlock.textContent = initialText;
            editContainer.remove();
        });

        editContainer.appendChild(inputField);
        editContainer.appendChild(saveButton);
        editContainer.appendChild(cancelButton);

        targetBlock.textContent = "";
        targetBlock.appendChild(editContainer);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const calculateAreaButton = document.getElementById("calculateArea");
    const pentagonSideInput = document.getElementById("pentagonSide");
    const pentagonResult = document.getElementById("pentagonResult");

    function calculatePentagonArea() {
        const side = parseFloat(pentagonSideInput.value);
        if (isNaN(side) || side <= 0) {
            pentagonResult.textContent = "Введіть коректне значення сторони!";
            pentagonResult.style.color = "red";
            return;
        }
        const area = (5 / 4) * Math.pow(side, 2) / Math.tan(Math.PI / 5);
        pentagonResult.textContent = `Площа п'ятикутника: ${area.toFixed(2)}`;
        pentagonResult.style.color = "green";
    }

    calculateAreaButton.addEventListener("click", calculatePentagonArea);

    const checkTriangleButton = document.getElementById("checkTriangle");
    const sideAInput = document.getElementById("sideA");
    const sideBInput = document.getElementById("sideB");
    const sideCInput = document.getElementById("sideC");
    const triangleResult = document.getElementById("triangleResult");

    function canFormTriangle(a, b, c) {
        return a + b > c && a + c > b && b + c > a;
    }

    function checkTriangle() {
        const sideA = parseFloat(sideAInput.value);
        const sideB = parseFloat(sideBInput.value);
        const sideC = parseFloat(sideCInput.value);

        if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || sideA <= 0 || sideB <= 0 || sideC <= 0) {
            triangleResult.textContent = "Введіть правильні значення сторін!";
            triangleResult.style.color = "red";
            return;
        }

        const result = canFormTriangle(sideA, sideB, sideC);
        const message = result
            ? "Трикутник може бути збудований."
            : "Трикутник не може бути збудований.";

        triangleResult.textContent = message;
        triangleResult.style.color = result ? "green" : "red";

        document.cookie = `triangleCheck=${message}; path=/; max-age=60`;
        alert(message);
    }

    checkTriangleButton.addEventListener("click", checkTriangle);

    const cookies = document.cookie.split("; ").find((row) => row.startsWith("triangleCheck="));
    if (cookies) {
        const savedMessage = cookies.split("=")[1];
        if (confirm(`${savedMessage}\n\nНатисніть "OK", щоб видалити cookies та оновити сторінку.`)) {
            document.cookie = "triangleCheck=; path=/; max-age=0";
            alert("Cookies видалено. Оновлюємо сторінку...");
            location.reload();
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("minecraftText");
    const capitalizeToggle = document.getElementById("capitalizeToggle");

    function capitalizeText(text) {
        return text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    function lowercaseText(text) {
        return text.toLowerCase();
    }

    function handleToggleChange() {
        if (capitalizeToggle.checked) {
            textElement.textContent = capitalizeText(textElement.textContent);
            localStorage.setItem("capitalizeEnabled", "true");
        } else {
            textElement.textContent = lowercaseText(textElement.textContent);
            localStorage.setItem("capitalizeEnabled", "false");
        }
    }

    const capitalizeEnabled = localStorage.getItem("capitalizeEnabled") === "true";
    capitalizeToggle.checked = capitalizeEnabled;

    if (capitalizeEnabled) {
        textElement.textContent = capitalizeText(textElement.textContent);
    } else {
        textElement.textContent = lowercaseText(textElement.textContent);
    }

    capitalizeToggle.addEventListener("change", handleToggleChange);
});