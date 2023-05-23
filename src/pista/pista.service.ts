import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Pista } from './pista';

@Injectable()
export class PistaService {
    private pistasAudio = [];

constructor(){
    this.loadPistas();
}

 private loadPistas():void{
   let archivo = fs.readFileSync('pistas.csv','utf-8');
   let lineas: string[] = archivo.split('\n');
   let linea:string;
   let dato: string[]=[];
   let datos: string [][] = []
   for (let i=0;i<lineas.length;i++){
    linea = lineas[i].replace('\r','');
    dato = linea.split(',');
    datos.push(dato);
   }
   for(let i=0; i<datos.length;i++){
    let id=parseInt(datos[i][0]);
    let dur=parseInt(datos[i][2]);
    let pista= new Pista(id,datos[i][1],dur,datos[i][3]);
    this.pistasAudio.push(pista);
   }
}

 public getPistas():any{
    return this.pistasAudio;
 }

 public getPistaByID(id:number):any{
    let pista = this.pistasAudio.find(p => p.id === id);
    let pistaAux = [];
    pistaAux.push(pista);
    return pistaAux;
 }
 public crearPista(body:any):string{
    let id = parseInt(body.id);
    let dur = parseInt(body.duracion);
    let pista = new Pista(id,body.titulo,dur,body.interprete);
    if (!this.existeId(id)){
        if (pista.getDuracion() && pista.getId() && pista.getInterprete() && pista.getTitulo()){
            this.pistasAudio.push(pista);
            fs.appendFileSync('pistas.csv',`\n${pista.getId()},${pista.getTitulo()},${pista.getDuracion()},${pista.getInterprete()}`);
            return  'OK'
            }else {
                throw new BadRequestException('Elemento no agregado, faltan datos');
            }
    }else{
        throw new BadRequestException(`El elemento con id: ${id} ya existe`);
    }
 }
 private existeId(id:number):Boolean{
  let existe=false;
  for(let i=0;i<this.pistasAudio.length;i++){
    if (this.pistasAudio[i].id===id){
        existe=true;
    }
  }
  return existe;
 }

 public modificarPista(id:number,body:any):any{
    let existe = false;
    let pos = 0;
    for(let i=0;i<this.pistasAudio.length;i++){
        if(id === this.pistasAudio[i].id){
            existe=true;
            pos=i;
        }
    }
    if(existe){
        this.pistasAudio[pos].duracion = body.duracion;
        this.pistasAudio[pos].interprete = body.interprete;
        this.pistasAudio[pos].titulo = body.titulo;
        return {
            "msj": `Pista ${id} modificada`,
            "Pista": this.pistasAudio[pos]
        }
    }else{
        return {"Msj": `Pista ${id} no encontrada`}
    }
 }
 public eliminarPista(id:number):any{
    let existe = false;
    let pos = 0;
    for(let i=0;i<this.pistasAudio.length;i++){
        if(id === this.pistasAudio[i].id){
            existe=true;
            pos=i;
        }
    }
    if(existe){
        this.pistasAudio.splice(pos,1);
        return {
            "msj": `Pista ${id} eliminada`,
        }
    }
    else{
        return {"Msj": `Pista ${id} no encontrada`}
    }
 }
}
