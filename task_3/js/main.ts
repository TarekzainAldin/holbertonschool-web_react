///<refernce path = "./crud.d.ts"/>
import { RowID,RowElement } from "./interface";
import * as CRUD from './crud.js';


const row : RowElement = {
    firstName:'Guilaume' , 
    lastName: 'Salava'
}

const newRowID: RowID = CRUD.insertRow(row)
const updateRow:RowElement={...row,age:23};
CRUD.updateRow(newRowID,updateRow);
CRUD.deleteRow(newRowID);


//comment >>>"./crud.d.ts/>"
