  import { RowID,RowElement } from "./interface";
  declare function insertRow(row:RowElement):number;
  declare function deleteRow(rowID:RowID):void;
  declare function updateRow(rowID:RowID,row:RowElement):number;
