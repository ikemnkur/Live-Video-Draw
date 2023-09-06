const API_KEY = 'YOUR_GOOGLE_CUSTOM_SEARCH_API_KEY';
const CX = 'YOUR_CUSTOM_SEARCH_ENGINE_ID';

function searchImages() {
    const query = document.getElementById("searchInput").value;
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${CX}&searchType=image&num=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data.items);
        })
        .catch(error => {
            console.error("There was an error fetching the images:", error);
        });
}

function displayImages(items) {
    const container = document.getElementById("imageContainer");
    container.innerHTML = ""; // Clear previous results

    items.forEach(item => {
        const img = document.createElement("img");
        img.src = item.link;
        img.alt = item.snippet;
        container.appendChild(img);
    });
}
