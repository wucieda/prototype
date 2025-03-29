

export interface Table {
    idTable: string, //id de la tabla puede ser un nombre comun como empleados, ventas etc
    descTable: string, //nombre de la tabla similar al idTable pero en minuscula 
    fields: Field[] //metadata descriptivo de los campos de la tabla 
}

export interface Field {
    idField: string, //id del campo puede ejemplo nombre, edad, etc
    idDesc: string, //similar al anterior pero va a ser el nombre de la columna
    type: string | number, //la columna puede ser de tipo string o number
    pk: boolean, //define si es el campo es clave primaria o no de la fila
    catalog: Catalog[] //si el campo puede ser un dropdown o no, ahi trae los valores del dropdown
}

export interface Catalog {
    id: string, //id del dropdown
    descId: string //nombre del dropdown
}

export interface Data {
    rowId: string, //el id de la fila es un string
    action: 'NONE' | 'UPDATE_INSERT' | 'DELETE', //registro de la accion que se va a realizar, por defecto NONE y cambiara si se hacen modificaciones en la fila
    values: any[] // los valores con los que estara cargara la fila
    status: 'none' | 'new' | 'modified' | 'deleted' //estado de la fila, puede ser nueva, modificada o eliminada
}
