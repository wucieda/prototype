import { Component } from '@angular/core';
import { FormArray, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  form: FormGroup;
  selectedEmployeeForm: FormGroup;
  selectedProjectIndex: number | null = null;
  selectedCertIndex: number | null = null;
  showProjectModal = false;
  showCertModal = false;

  showSelectModal = false;
  selectedEmployee: any = null;


  employeeList = [
    { firstName: 'Ana', lastName: 'Pérez', department: 'IT', role: 'Desarrolladora' },
    { firstName: 'Luis', lastName: 'Martínez', department: 'HR', role: 'Analista' },
    { firstName: 'María', lastName: 'Gómez', department: 'Finanzas', role: 'Contadora' }
  ];

  constructor(private fb: FormBuilder) {
    this.selectedEmployeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      department: [''],
      role: ['']
    });

    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      dateOfBirth: [''],
      gender: [''],
      position: [''],
      department: [''],
      hireDate: [''],
      salary: [0],
      fullTime: [true],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
        country: ['']
      }),
      skills: this.fb.array([]),
      education: this.fb.array([]),
      workExperience: this.fb.array([]),
      certifications: this.fb.array([]),
      projects: this.fb.array([]),
      emergencyContact: this.fb.group({
        name: [''],
        relationship: [''],
        phone: ['']
      }),
      languages: this.fb.array([])
    });
  }

  get certifications(): FormArray {
    return this.form.get('certifications') as FormArray;
  }

  get projects(): FormArray {
    return this.form.get('projects') as FormArray;
  }

  openProjectModal(index: number | null = null) {
    this.selectedProjectIndex = index;
    this.showProjectModal = true;
  }

  closeProjectModal() {
    this.showProjectModal = false;
    this.selectedProjectIndex = null;
  }

  saveProject(projectData: any) {
    if (this.selectedProjectIndex === null) {
      this.projects.push(this.fb.group(projectData));
    } else {
      this.projects.at(this.selectedProjectIndex).patchValue(projectData);
    }
    this.closeProjectModal();
  }

  openCertModal(index: number | null = null) {
    this.selectedCertIndex = index;
    this.showCertModal = true;
  }

  closeCertModal() {
    this.showCertModal = false;
    this.selectedCertIndex = null;
  }

  saveCert(certData: any) {
    if (this.selectedCertIndex === null) {
      this.certifications.push(this.fb.group(certData));
    } else {
      this.certifications.at(this.selectedCertIndex).patchValue(certData);
    }
    this.closeCertModal();
  }

  removeProject(index: number) {
    this.projects.removeAt(index);
  }

  removeCert(index: number) {
    this.certifications.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
  }



  openSelectModal() {
    this.showSelectModal = true;
    this.selectedEmployee = null;
    this.selectedEmployeeForm.reset();
  }

  closeSelectModal() {
    this.showSelectModal = false;
    this.selectedEmployee = null;
  }

  selectEmployee(index: number) {
    this.selectedEmployee = this.employeeList[index];
    this.selectedEmployeeForm.setValue({
      firstName: this.selectedEmployee.firstName,
      lastName: this.selectedEmployee.lastName,
      department: this.selectedEmployee.department,
      role: this.selectedEmployee.role
    });
  }

  saveSelectedEmployee() {
    if (!this.selectedEmployee) return;
    Object.assign(this.selectedEmployee, this.selectedEmployeeForm.value);
    this.closeSelectModal();
  }
} 
