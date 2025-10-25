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

let attackPlayer
let attackEnemy
let lifePlayer = 3
let lifeEnemy = 3

function runGame() {
    let btnMascotaJugador = document.getElementById('btn-mascota');
    btnMascotaJugador.addEventListener('click', selectMascotaJugador)

    btnAttackFuego = document.getElementById('btn-fuego')
    btnAttackFuego.addEventListener('click', attackFuego)

    btnAttackAgua = document.getElementById('btn-agua')
    btnAttackAgua.addEventListener('click', attackAgua)

    btnAttackTierra = document.getElementById('btn-tierra')
    btnAttackTierra.addEventListener('click', attackTierra)

    renderPets();
    renderLife()
    hideObject(document.getElementById('restart'))
    hideObject(document.getElementById('seleccion-ataque'))
}

function hideObject(object) {
    object.style.display = 'none'
}
function showObject(object) {
    object.style.display = 'block'
}

function renderLife() {

    const spanLifePlayer = document.getElementById('life-player')
    const spanLifeEnemy = document.getElementById('life-enemy')

    spanLifePlayer.innerHTML = lifePlayer
    spanLifeEnemy.innerHTML = lifeEnemy

    if (lifeEnemy == 0) {
        createMessage('Ganaste')
        bloquedBtns()
        showObject(document.getElementById('restart'))
    }
    else if (lifePlayer == 0) {
        createMessage('Perdiste')
        bloquedBtns()
        showObject(document.getElementById('restart'))
    }

}

function bloquedBtns() {
    const btnAgua = document.getElementById('btn-agua')
    const btnFuego = document.getElementById('btn-fuego')
    const btnTierra = document.getElementById('btn-tierra')

    btnAgua.disabled = true
    btnFuego.disabled = true
    btnTierra.disabled = true
}

function createMessage(message) {
    const secMessages = document.getElementById('sec-messages')
    let messageP = document.createElement('p')
    messageP.innerHTML = message
    secMessages.appendChild(messageP)
}

function renderPets() {
    const sectionPets = document.getElementById("tarjetas")

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

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function selectMascotaJugador() {
    let selectePet = document.querySelector('input[name="mascota"]:checked');
    let spanPetPlayer = document.getElementById('pet-player')
    if (selectePet == null) {
        alert("Debes seleccionar una mascota")
    }
    else {
        spanPetPlayer.innerHTML = selectePet.id
        selectPetEnemy();
        showObject(document.getElementById('seleccion-ataque'))
        hideObject(document.getElementById('sect-pets'))
    }
}

function selectPetEnemy() {
    let spanPetEmnemy = document.getElementById('pet-enemy')
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
    console.log(attackPlayer, attackEnemy);
    renderMessage()
    renderLife()
}

function renderMessage() {
    const secMessages = document.getElementById('sec-messages')
    let message = document.createElement('p')
    message.innerHTML = attackPlayer + ' - ' + attackEnemy
    secMessages.appendChild(message)
    winDecision(message)
}

function winDecision(message) {


    console.log(attackEnemy == attackPlayer);

    if ((attackPlayer == 'Fuego') && (attackEnemy == 'Agua')) {
        message.innerHTML += ' - Ganaste'
        lifeEnemy -= 1
    }
    else if ((attackPlayer == 'Tierra') && (attackEnemy == 'Fuego')) {
        message.innerHTML += ' - Ganaste'
        lifeEnemy -= 1
    }
    else if ((attackPlayer == 'Agua') && (attackEnemy == 'Tierra')) {
        message.innerHTML += ' - Ganaste'
        lifeEnemy -= 1
    }
    else if (attackEnemy == attackPlayer) {
        message.innerHTML += ' - Empate'
    }
    else {
        message.innerHTML += ' - Perdiste'
        lifePlayer -= 1
    }

}

window.addEventListener('load', runGame)