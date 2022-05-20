const button = document.getElementById('b')
const text = document.getElementById('test')

function clicked(event) {
    alert("YOU CLICKED ME!")
    text.innerText = "CLICKED THE BUTTOn"
}

button.addEventListener("click", clicked)