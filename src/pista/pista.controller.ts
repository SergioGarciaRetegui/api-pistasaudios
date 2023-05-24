import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PistaService } from './pista.service';

@Controller('pista')
export class PistaController {

    private pistas = [];
    
    constructor(private pistaService: PistaService){}
    
    @Get('pistas')
    public getPistas():any{
        return this.pistaService.getPistas(); 
    }
    @Get('buscar/:id')
    public getPistaByID(@Param('id',ParseIntPipe) id:number):any{
        return this.pistaService.getPistaByID(id);
    }
    @Post('crear')
    public crearPista(@Body() body:any):any{
        return this.pistaService.crearPista(body);
    }
    @Put('modificar/:id')
    public modificarPista(@Param('id',ParseIntPipe) id:number,@Body() body:any):any{
        return this.pistaService.modificarPista(id,body);
    }
    @Delete('eliminar/:id')
    public eliminarPista(@Param('id',ParseIntPipe) id: number):any{
        return this.pistaService.eliminarPista(id);
    }

}
