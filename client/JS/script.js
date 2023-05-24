let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click",agregar);

let btnDuracion = document.querySelector("#btnDuracion");
btnDuracion.addEventListener("click",duracion);

let btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click",buscarMostrar);

let pistas = [];
load();

async function load(){
    let promesa = fetch('/pista/pistas');
    console.log(promesa);
    let respuesta = await promesa;
    console.log (respuesta);
    if (respuesta.ok){
        let renglon = await respuesta.json();
        console.log(renglon);
        pistas = renglon;
        mostraPista();
    }

}

async function buscarMostrar(){
    let id = document.getElementById("idBuscar").value;
    console.log(id);
    if (id == ''){     
        load();
    }else{
        let promesa = fetch(`/pista/buscar/${id}`);
        console.log(promesa);
        let respuesta = await promesa;
        if (respuesta.ok){
            let renglon = await respuesta.json();
            pistas = renglon;
            mostraPista();
            
    }
}
}

function agregar(){
   let identificador = parseInt(document.querySelector("#identificador").value);
   let titulo = document.getElementById("titulo").value;
   let duracion = parseInt(document.getElementById("duracion").value);
   let interprete = document.getElementById("interprete").value;

   let renglon = {
        "id":identificador,
        "titulo":titulo,
        "duracion":duracion,
        "interprete":interprete
   }
        pistas.push(renglon);
        mostraPista();

}

function mostraPista(){
    let html="";

    for(let rg of pistas){
        html+=`
        <tr> 
            <td>${rg.id}</td>
            <td>${rg.titulo}</td>
            <td>${rg.duracion}</td>            
            <td>${rg.interprete}</td>
            <td><a href="pistaDetails.html?identificador=${rg.id}">Editar</a></td>            
        </tr>
        `;
    }
    document.querySelector("#tbPistas").innerHTML = html;
}

function duracion(){
    let total=0;
    let max = {
        "titulo":"",
        "duracion":0
    }

    for(let i=0;i<pistas.length;i++){
        total+=pistas[i].duracion;
        if (pistas[i].duracion > max.duracion){
            max.duracion = pistas[i].duracion;
            max.titulo = pistas[i].titulo;
        }
    }

    document.querySelector("#total").innerHTML = `
    <p> Duracion Total: ${total} </p>
    <p> Titulo de la pista mas larga es: ${max.titulo} con una duracion de ${max.duracion}</p>
    `
}
