import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toastr: ToastrService) {}

  handleHttpError(error: HttpErrorResponse): void {
    const msg = this.extractMessage(error);

    switch (error.status) {
      case 0:
        this.toastr.error('No se puede conectar con el servidor.', 'Error');
        break;
      case 400:
        this.toastr.warning(msg, 'Solicitud inválida (400)');
        break;
      case 401:
        this.toastr.warning('No autorizado. Por favor, inicia sesión', 'Error 401');
        break;
      case 403:
        this.toastr.error('No tienes permisos para realizar esta acción', 'Error 403');
        break;
      case 404:
        this.toastr.info('Recurso no encontrado.', 'Error 404');
        break;
      case 500:
        this.toastr.error('Error interno del servidor.', 'Error 500');
        break;
      default:
        this.toastr.error(msg, `Error ${error.status}`);
        break;
    }
  }

  private extractMessage(error: HttpErrorResponse): string {
    return error.message || 'Ocurrió un error inesperado';
  }
}
