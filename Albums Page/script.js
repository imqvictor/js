const page = document.querySelector('.page');
const btn = document.getElementById('btn');
let startIndex = 0;
let endIndex = 4;

//declare album data in the global scope so that it can be accessed by the display function and the moreAlbums function
let albumData = [];

async function searchAlbums() {

    const request = `https://jsonplaceholder.typicode.com/photos`;
    const response = await fetch(request);

    if (!response.ok) {
        console.log("Request Failed", response.status);
    }

    const data = await response.json();

    console.log(data);

    albumData = data;


    display(albumData.slice(startIndex, endIndex));


}
searchAlbums();

function display(albums) {
    page.innerHTML = "";

    albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.innerHTML = `
            <img src="${album.thumbnailUrl}" alt="${album.title}">
            <p>${album.title}</p>
            <a href="${album.url}">view full image</a>
            `;

        page.appendChild(albumDiv);

    });
}

function moreAlbums() {
    startIndex += 4;
    endIndex += 4;

    display(albumData.slice(startIndex, endIndex));

    if (albumData.length <= endIndex) {
        btn.disabled = true;

        btn.textContent = "no more albums";
    }
}
btn.addEventListener('click', moreAlbums);