import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../servicios/usuario.service';
import { RolesService } from '../../servicios/roles.service';
import { AbmUsuarioComponent } from 'src/app/features/usuarios/componentes/abm-usuario/abm-usuario.component'; 
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../clases/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

@ViewChild(MatTable, {static: true}) table!: MatTable<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
ds:any;

  constructor(private loginService: LoginService,
    public dialog:MatDialog, 
    private servicioUsuario:UsuarioService, 
    private servicioRoles:RolesService, ) { }

  frm:FormGroup=new FormGroup({
    usuario:new FormControl('',[Validators.required]),
    clave: new FormControl('',[Validators.required])
  });


  ngOnInit(): void {
  }

  ingresar()
  {
    this.loginService.doLogin(this.frm.value.usuario,this.frm.value.clave)
  }

  altaUsuario()
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(0,"","",new Date(),0,"",0,"","",1,undefined),
                                                          rolesPermitidos:this.servicioRoles.getRoles(),
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        let addUsr=this.servicioUsuario.addUsuario(result);

        if (addUsr!=null) {
          addUsr.subscribe(
            data => {

              this.table.renderRows();

              //this.listar();
              // this.obtenerUsuarios();

              this.ds.paginator = this.paginator; 
            }
          )
        }
        // this.table.renderRows();
        // // this.obtenerUsuarios();

        //  this.ds.paginator = this.paginator;
      }
      
    });

  }
}
