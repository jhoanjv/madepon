pets = [
    {
        name: 'Hipodoger',
        img: './assets/mokepons_mokepon_ratigueya_attack.webp'
    },
    {
        name: 'Capipepo',
        img: './assets/mokepons_mokepon_ratigueya_attack.webp'
    },
    {
        name: 'Ratigueya',
        img: './assets/mokepons_mokepon_ratigueya_attack.webp'
    },
    {
        name: 'Langostelvis',
        img: './assets/mokepons_mokepon_ratigueya_attack.webp'
    },
    {
        name: 'Tucapalma',
        img: './assets/mokepons_mokepon_ratigueya_attack.webp'
    }
]

atacks = ["Agua", "Fuego", "Tierra"]

const btnMascotaJugador = document.getElementById('btn-mascota');
const btnAttackFuego = document.getElementById('btn-fuego')
const btnAttackAgua = document.getElementById('btn-agua')
const btnAttackTierra = document.getElementById('btn-tierra')
const backLastResult = document.getElementById('back-last-result')
const seleccionAtaque = document.getElementById('seleccion-ataque')
const sectionPets = document.getElementById("tarjetas")
const spanLifePlayer = document.getElementById('life-player')
const spanLifeEnemy = document.getElementById('life-enemy')
const spanPetPlayer = document.getElementById('pet-player')
const spanPetEmnemy = document.getElementById('pet-enemy')
const secPets = document.getElementById('sect-pets')
const ctnResult = document.getElementById('result')
const ctnEnemy = document.getElementById('attack-enemy')
const ctnPlayer = document.getElementById('attack-player')
const secMessages = document.getElementById('last-result')

let attackPlayer
let attackEnemy
let result
let lifePlayer = 3
let lifeEnemy = 3

function runGame() {
    
    btnMascotaJugador.addEventListener('click', selectMascotaJugador)
    btnAttackFuego.addEventListener('click', attackFuego)
    btnAttackAgua.addEventListener('click', attackAgua)
    btnAttackTierra.addEventListener('click', attackTierra)

    renderPets();
    renderLife()
    hideObject(backLastResult)
    hideObject(seleccionAtaque)
}

function hideObject(object) {
    object.style.display = 'none'
}

function showObject(object) {
    object.style.display = 'flex'
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function finishGame(message) {
    btnAttackAgua.disabled = true
    btnAttackFuego.disabled = true
    btnAttackTierra.disabled = true

    createLastMessage(message)
    showObject(backLastResult)
}

function renderPets() {

    pets.forEach(pet => {
        // Crear input
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = pet.name;
        radioInput.name = "mascota";
        radioInput.value = pet.name;

        // Crear label
        const labelInput = document.createElement("label");
        labelInput.htmlFor = pet.name;
        labelInput.className = "tarjeta-mokepon";

        // Crear texto
        const span = document.createElement("span");
        span.textContent = pet.name;

        // Crear imagen
        const img = document.createElement("img");
        img.src = pet.img;
        img.alt = pet.name;
        img.className = "pet-img";

        // Estructura: <label> <img> <span> </label>
        labelInput.appendChild(span);
        labelInput.appendChild(img);

        // Insertar en el contenedor
        sectionPets.appendChild(radioInput);
        sectionPets.appendChild(labelInput);
    });
}

function renderLife() {
    spanLifePlayer.innerHTML = lifePlayer
    spanLifeEnemy.innerHTML = lifeEnemy

    if (lifeEnemy == 0) {
        finishGame('Ganaste')
    }
    else if (lifePlayer == 0) {
        finishGame('Perdiste')
    }
}

function selectMascotaJugador() {
    let selectePet = document.querySelector('input[name="mascota"]:checked')

    if (selectePet == null) {
        return alert("Debes seleccionar una mascota")
    }

    spanPetPlayer.innerHTML = selectePet.id
    selectPetEnemy();

    hideObject(secPets)
    showObject(seleccionAtaque)

}

function selectPetEnemy() {
    let petEnemy = pets[random(0, pets.length - 1)]
    spanPetEmnemy.innerHTML = petEnemy.name
}

function attackFuego() {
    attackPlayer = 'Fuego'
    selectAttackEnemy()
}

function attackAgua() {
    attackPlayer = 'Agua'
    selectAttackEnemy()
}

function attackTierra() {
    attackPlayer = 'Tierra'
    selectAttackEnemy()
}

function selectAttackEnemy() {
    attackEnemy = atacks[random(0, atacks.length - 1)]
    renderMessage()
    renderLife()
}

function winDecision() {

    if ((attackPlayer == 'Fuego') && (attackEnemy == 'Agua')) {
        result = 'Ganaste'
        lifeEnemy -= 1
    }
    else if ((attackPlayer == 'Tierra') && (attackEnemy == 'Fuego')) {
        result = 'Ganaste'
        lifeEnemy -= 1
    }
    else if ((attackPlayer == 'Agua') && (attackEnemy == 'Tierra')) {
        result = 'Ganaste'
        lifeEnemy -= 1
    }
    else if (attackEnemy == attackPlayer) {
        result = 'Empate'
    }
    else {
        result = 'Perdiste'
        lifePlayer -= 1
    }

}

function renderMessage() {
    winDecision(result)

    let alertResutl = document.createElement('p')
    let alertPlayer = document.createElement('p')
    let alertEnemy = document.createElement('p')

    alertResutl.innerHTML = result
    alertPlayer.innerHTML = attackEnemy
    alertEnemy.innerHTML = attackPlayer

    ctnResult.appendChild(alertResutl)
    ctnEnemy.appendChild(alertPlayer)
    ctnPlayer.appendChild(alertEnemy)
}

function createLastMessage(message) {
    let messageP = document.createElement('p')
    messageP.innerHTML = message
    secMessages.appendChild(messageP)
}

window.addEventListener('load', runGame)