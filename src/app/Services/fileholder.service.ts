import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FileholderService {
file:any
  constructor() { }
setfile(file:any){
this.file = file;
}
getfile(){
  return this.file;
}
}