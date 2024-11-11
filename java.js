class Piece {
    constructor(x, y, number_id, canvasElement) {
        this.x = x;
        this.y = y;
        this.number_id = number_id;
        this.canvasElement = canvasElement;
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (!ev.target.firstChild) {
        ev.target.appendChild(document.getElementById(data));
        var children = document.getElementById("solvingPiecesContainer").getElementsByTagName("*");
        if (children.length >= 32) {
            sendNotification();
        }
    } else {
        console.log("Ten kontener jest już zajęty!");
    }
}

function sendNotification() {
    var container = document.getElementById("solvingPiecesContainer").children;
    for (var i = 0; i < container.length; i++) {
        var pieceContainer = container[i];
        var puzzlePiece = pieceContainer.firstChild;

        
        if (!puzzlePiece) {
            console.log("Puzzle są niepoprawnie ułożone! Brakuje elementu.");
            alert("Puzzle są niepoprawnie ułożone! Brakuje elementu.");
            return;
        }

        
        var containerIndex = pieceContainer.id.split("-").pop(); 
        var puzzleIndex = puzzlePiece.id; 
        if (containerIndex !== puzzleIndex) {
            console.log(`Puzzle są niepoprawnie ułożone! Element ${puzzleIndex} jest w złym miejscu.`);
            alert(`Puzzle są niepoprawnie ułożone! Element ${puzzleIndex} jest w złym miejscu.`);
            return;
        }
    }

   
    console.log("Gratulacje, puzzle ułożone poprawnie!");
    alert("Gratulacje, puzzle ułożone poprawnie!");
}


var map;

window.onload = function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoib3NrYXJ6dXQiLCJhIjoiY2t5bmU0azBwMmd1ODJ3cDB4c2s4bnI1NyJ9.smj5Jioo-qtBqMPB2OphJQ'
    }).addTo(map);
};

function getgeolocation() {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            map.setView([pos.coords.latitude, pos.coords.longitude], 16);
            L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
                .bindPopup("Twoja lokalizacja")
                .openPopup();
        },
        () => {
            alert("Nie udało się pobrać geolokalizacji.");
        }
    );
}

function takeimage() {
    var image = new Image();
    image.src = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${map.getCenter().lng},${map.getCenter().lat},${map.getZoom() - 1},0,0/900x400?logo=false&attribution=false&access_token=pk.eyJ1Ijoib3NrYXJ6dXQiLCJhIjoiY2t5bmU0azBwMmd1ODJ3cDB4c2s4bnI1NyJ9.smj5Jioo-qtBqMPB2OphJQ`;
    image.setAttribute('crossOrigin', 'anonymous');
    
    image.onload = function () {
       
        var fullCanvasContainer = document.createElement('div'); 
        fullCanvasContainer.style.textAlign = "center";
        fullCanvasContainer.style.marginBottom = "20px";

        var fullCanvas = document.createElement('canvas');
        fullCanvas.width = image.width;
        fullCanvas.height = image.height;
        var context = fullCanvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);

       
        var description = document.createElement('p');
        description.textContent = "Pobrana mapa (pełny widok)";
        description.style.fontSize = "18px";
        description.style.fontWeight = "bold";

   
        fullCanvasContainer.appendChild(description);
        fullCanvasContainer.appendChild(fullCanvas);

        
        var mainContainer = document.querySelector('main');
        mainContainer.insertBefore(fullCanvasContainer, mainContainer.firstChild);

        
        cutImageUp(image);
    };
}


function cutImageUp(image) {
    var widthOfOnePiece = image.width / 4;
    var heightOfOnePiece = image.height / 4;
    var imagePieces = [];
    var counter = 0;

    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            var imagePiece = new Piece(x, y, counter, canvas);
            imagePieces.push(imagePiece);
            counter++;
        }
    }

    imagePieces = imagePieces.sort(() => 0.5 - Math.random());
    var container = document.getElementById("piecesContainer");
    container.innerHTML = '';
    document.getElementById("solvingPiecesContainer").innerHTML = '';

    for (var i = 0; i < imagePieces.length; i++) {
        var temp_img = new Image();
        temp_img.draggable = true;
        temp_img.ondragstart = drag;
        temp_img.src = imagePieces[i].canvasElement.toDataURL();
        temp_img.id = imagePieces[i].number_id;
        container.appendChild(temp_img);
    }

    var solvingPiecesContainer = document.getElementById("solvingPiecesContainer");

    for (var i = 0; i < 16; i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("pieceContainer");
        newDiv.classList.add("col-3");
        newDiv.id = `piece-container-${i}`;
        newDiv.ondrop = drop;
        newDiv.ondragover = allowDrop;
        solvingPiecesContainer.appendChild(newDiv);
    }
}
