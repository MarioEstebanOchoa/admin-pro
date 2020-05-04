import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5 ? true : false);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }

  loginGoogle(token: string) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    )

  }


  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    )

  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICES + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success')
        return resp.usuario;
      }))
  }


  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {

        if (usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario)
        }

        swal('Usuario Actualizado', usuario.nombre, 'success');
        return true;
      })
    )

  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      })

  }

  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICES + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

  buscarUsuario(termino: string) {

    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino

    return this.http.get(url).pipe(
      map((resp: any) => resp.usuarios)
    )

  }

  borrarUsuario(id: string) {

    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(
      map(resp => {
        swal("Usuario borrado", "El usuario ha sido eliminado correctamente", "success");
        return true;
      })
    )

  }

}
