export class Pista {
    private id: number;
    private titulo: string;
    private duracion: number;
    private interprete: string;

    constructor(id:number,tit:string,dur:number,int:string){
        this.id=id;
        this.titulo=tit;
        this.duracion = dur;
        this.interprete = int;
    }

    public getId():number{
        return this.id;
    }
    public getTitulo():string{
        return this.titulo;
    }
    public getDuracion():number {
        return this.duracion;
    }
    public getInterprete():string{
        return this.interprete;
    }

}
