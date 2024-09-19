const API_KEY = "YOUR_API_KEY";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".images-section");

const getImages = async () => {
    // Check if input is empty
    const prompt = inputElement.value.trim();
    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    // Clear previous images
    imageSection.innerHTML = "";

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": prompt,
            "n": 2,
            "size": "1024x1024"
        })
    }

    try {
        // Show loading message
        const loadingMessage = document.createElement("p");
        loadingMessage.textContent = "Loading images...";
        imageSection.append(loadingMessage);

        const response = await fetch("https://api.openai.com/v1/images/generations", options);
        const data = await response.json();

        // Remove loading message
        imageSection.removeChild(loadingMessage);

        // Display images
        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const imageElement = document.createElement("img");
            imageElement.setAttribute("src", imageObject.url);

            imageContainer.append(imageElement);
            imageSection.append(imageContainer);
        });
    } catch (error) {
        console.error("Error fetching images:", error);

        // Display error message
        imageSection.innerHTML = "<p>Failed to load images. Please try again later.</p>";
    }
}

submitIcon.addEventListener("click", getImages);
