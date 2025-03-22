import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Role {
  value: string;
  label: string;
}

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent implements OnInit {
  form!: FormGroup;
  roles: Role[] = [
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'USER', label: 'User' },
    { value: 'GUEST', label: 'Guest' }
  ];

  readOnly = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      age: [null],
      role: [null]
    });

    // Simula datos existentes (modo edición)
    const employee = {
      name: 'Ana',
      age: 30,
      role: 'ADMIN' // esto viene del backend
    };

    this.loadEmployee(employee);
  }

  loadEmployee(employee: any) {
    const selectedRole = this.roles.find(r => r.value === employee.role) || null;
    this.form.patchValue({
      name: employee.name,
      age: employee.age,
      role: selectedRole
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Empleado enviado:', this.form.value);
    }
  }

  toggleReadOnly(): void {
    this.readOnly = !this.readOnly;
  }
}