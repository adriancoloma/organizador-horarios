import {Materia} from './OrganizadorHorarios';
import * as Excel from 'exceljs';
export default class GeneradorExcel{
    private codigoArchivoActual = 0;
    private carpeta = "./excel";

    public generarExcel(tabla: string[][]) : string{
        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet('Horario');
        worksheet.columns = [
            { header: 'Hora', key: 'hora', width: 10 },
            { header: 'Lunes', key: 'lunes', width: 30 },
            { header: 'Martes', key: 'martes', width: 30 },
            { header: 'Miercoles', key: 'miercoles', width: 30 },
            { header: 'Jueves', key: 'jueves', width: 30 },
            { header: 'Viernes', key: 'viernes', width: 30 },
            { header: 'Sabado', key: 'sabado', width: 30 },
        ];

        for(let fila of tabla){
            worksheet.addRow(fila);
        }

        this.unirCeldasConMismoContenido(worksheet);
        this.centrarContenidoCeldas(worksheet);
        let nombreArchivo = this.carpeta + "/horario" + this.codigoArchivoActual + ".xlsx";
        this.codigoArchivoActual++;
        workbook.xlsx.writeFile(nombreArchivo);

        return nombreArchivo;
    }

    private unirCeldasConMismoContenido(worksheet: Excel.Worksheet){
        let numFilas = worksheet.rowCount;
        let numColumnas = worksheet.columnCount;

        worksheet.columns.forEach(column => {
            let materiaActual : string = "";
            let filaMateriaEmpieza : number = 0;
            let celdasQueSeUniran : number = 0;

            column.eachCell((cell, i) => {
                let contenidoCelda : string = cell.value == null ? null : cell.value.toString();
                
                if(contenidoCelda == null && celdasQueSeUniran == 1){
                    celdasQueSeUniran = 0;
                    return;
                }
                if(contenidoCelda == materiaActual){
                    celdasQueSeUniran++;
                    if(i == numFilas && celdasQueSeUniran > 1 && materiaActual != ""){
                        worksheet.mergeCells(filaMateriaEmpieza, column.number, i, column.number);
                    } 
                }else{
                    if(materiaActual != "" && filaMateriaEmpieza != i - 1 && celdasQueSeUniran > 0){
                        worksheet.mergeCells(filaMateriaEmpieza, column.number, i - 1, column.number);
                    }

                    materiaActual = contenidoCelda;
                    filaMateriaEmpieza = i;
                    celdasQueSeUniran = 1;
                }
            });
        })
    }

    private centrarContenidoCeldas(worksheet: Excel.Worksheet){
        worksheet.columns.forEach(column => {
            column.eachCell((cell, i) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
        })
    }
}


