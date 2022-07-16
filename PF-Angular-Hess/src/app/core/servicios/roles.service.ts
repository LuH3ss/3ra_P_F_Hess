import { Injectable } from '@angular/core';
/*ROLES:  
    1: Alumno
    2: Profesor
    3: Administrador
    4: Usuario
    */

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  listaRoles: any[] = [
    {
      id:2,//no ingresa
      nombre:"Alumno"
    },
    {
      id:1,//no puede ingresar
      nombre:"Profesor"
    },
    {
      id:1, //el rol uno accede a todo
      nombre:"Administrador"
    },
    {
      id:2, // visualiza y no edita
      nombre:"Usuario"
    }];

  constructor() { }

  getRoles() {
    return this.listaRoles;
  }

  getRol(id: number) {
    return this.listaRoles[this.listaRoles.findIndex(x => x.id == id)];
  }
  getRolPorNombre(nombre:string)
  {
    return this.listaRoles[this.listaRoles.findIndex(x => x.nombre == nombre)];
  }

}
