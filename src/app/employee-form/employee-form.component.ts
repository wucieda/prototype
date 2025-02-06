import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      position: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      hireDate: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required]]
      })
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Formulario enviado', this.employeeForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
