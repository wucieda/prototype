import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['error', 'warning', 'info']);

    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: ToastrService, useValue: spy }
      ]
    });

    service = TestBed.inject(ErrorHandlerService);
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show error toast for status 0', () => {
    service.handleHttpError(new HttpErrorResponse({ status: 0 }));
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('No se puede conectar con el servidor.', 'Error');
  });

  it('should show warning toast for status 400', () => {
    service.handleHttpError(new HttpErrorResponse({ status: 400 }));
    expect(toastrServiceSpy.warning).toHaveBeenCalledWith(jasmine.any(String), 'Solicitud inválida (400)');
  });

  it('should show warning toast for status 401', () => {
    service.handleHttpError(new HttpErrorResponse({ status: 401 }));
    expect(toastrServiceSpy.warning).toHaveBeenCalledWith('No autorizado. Por favor, inicia sesión', 'Error 401');
  });

  it('should show error toast for status 403', () => {
    service.handleHttpError(new HttpErrorResponse({ status: 403 }));
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('No tienes permisos para realizar esta acción', 'Error 403');
  });

  it('should show info toast for status 404', () => {
    service.handleHttpError(new HttpErrorResponse({ status: 404 }));
    expect(toastrServiceSpy.info).toHaveBeenCalledWith('Recurso no encontrado.', 'Error 404');
  });

  it('should show error toast for status 500', () => {
    service.handleHttpError(new HttpErrorResponse({ status: 500 }));
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Error interno del servidor.', 'Error 500');
  });

  it('should show error toast for unknown status', () => {
    service.handleHttpError(new HttpErrorResponse({ status: 999 }));
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(jasmine.any(String), 'Error 999');
  });
});
