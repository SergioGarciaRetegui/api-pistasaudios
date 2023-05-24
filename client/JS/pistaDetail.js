let params = [];

let btnEditar = document.getElementById("btnUpdate");
btnEditar.addEventListener("click",update);

cargar();
function processParams(){
    // localhost:3000/PistaDetails?identificador = 1 & titulo = titulo1
    let urlParametros = window.location.search.substring(1); // identificador = 1 & titulo = titulo1
    let arrayParametros = urlParametros.split("&")  // [identificador = 1,titulo = titulo1]
    for (let i=0;i<arrayParametros.length;i++){
        let tempParam = arrayParametros[i].split("="); // [identificador,1] // [titulo,titulo1] ....
        params[tempParam[0]]= tempParam[1]; // param[identificador]=1 // param[titulo] = titulo1 // .....
    }
}
async function cargar(){
    processParams();
    let id = parseInt(params["identificador"]);
    console.log(params);
    let response = await fetch (`/pista/buscar/${id}`);
    if (response.ok){
        let pista = await response.json();
        document.getElementById("identificador").value = pista[0].id;
        document.getElementById("titulo").value = pista[0].titulo;
        document.getElementById("duracion").value = pista[0].duracion;
        document.getElementById("interprete").value = pista[0].interprete;
    }
}

async function update(){
    let id = parseInt(params["identificador"]);
    let pista = {
        "titulo": document.getElementById("titulo").value,
        "duracion": document.getElementById("duracion").value,
        "interprete": document.getElementById("interprete").value
    }

    let response = await fetch(`/pista/modificar/${id}`,{
        method : 'PUT',
        headers: {'Content-Type':'application/json'},
        body : JSON.stringify(pista)
    })
    if (response.ok){
       alert(`pista ${id} Modificada`);
    }
}