import { Table, Field, Catalog, Data } from '../models/table.model'; // Ajusta la ruta si es necesario

export class DataGenerator {
  static generateTable(tableName: string): Table {
    const fields: Field[] = [
      { idField: 'name', idDesc: 'Nombre', type: 'string', pk: false, catalog: [] },
      { idField: 'age', idDesc: 'Edad', type: 'number', pk: false, catalog: [] },
      { idField: 'gender', idDesc: 'Género', type: 'string', pk: false, catalog: [
          { id: 'M', descId: 'Masculino' },
          { id: 'F', descId: 'Femenino' }
        ] 
      },
      { idField: 'department', idDesc: 'Departamento', type: 'string', pk: false, catalog: [
          { id: 'IT', descId: 'Tecnología' },
          { id: 'HR', descId: 'Recursos Humanos' },
          { id: 'SALES', descId: 'Ventas' }
        ] 
      }
    ];

    return {
      idTable: tableName.toUpperCase(),
      descTable: tableName.toLowerCase(),
      fields: fields
    };
  }

  static generateData(table: Table, rows: number = 5): Data[] {
    const data: Data[] = [];

    for (let i = 1; i <= rows; i++) {
      const rowValues: any[] = table.fields.map(field => {
        if (field.catalog.length > 0) {
          // Seleccionar un valor aleatorio del catálogo si existe
          return field.catalog[Math.floor(Math.random() * field.catalog.length)].id;
        } else if (field.type === 'number') {
          return Math.floor(Math.random() * 50) + 20; // Edad aleatoria entre 20 y 70
        } else {
          return `Texto-${i}`; // Texto genérico
        }
      });

      data.push({
        rowId: `row-${i}`,
        action: 'NONE',
        values: rowValues
      });
    }

    return data;
  }
}

// Ejemplo de uso
const exampleTable = DataGenerator.generateTable('empleados');
const exampleData = DataGenerator.generateData(exampleTable, 5);

console.log('Tabla generada:', exampleTable);
console.log('Datos generados:', exampleData);
