import { HttpClient } from '@angular/common/http';
import { BaseService } from './../services/base.service';
import { DynamicFieldService } from './../services/dynamicfield.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit{
  jsonData: any; 
  lastId: number = 0;
  
  constructor(
    private dynamicFieldService: DynamicFieldService, 
    private http: HttpClient,
    private ngToastSrvc: NgToastService,
    private router: Router
  
  ){}


  studentForm: FormGroup = new FormGroup({
    id: new FormControl(uuidv4()),
    studentList: new FormArray([this.getStudentFields()]),
  })

  ngOnInit(): void {
    // this.getJson()
  }
  
  getStudentFields(): FormGroup{
    return new FormGroup({
      student_name: new FormControl('', Validators.required),
      student_class: new FormControl('', Validators.required),
      student_age: new FormControl('', Validators.required),
      first_checkbox: new FormControl(false),
      second_checkbox: new FormControl(false)
    })
  }

  studentListArray() {
    return this.studentForm.get('studentList') as FormArray 
  }

  addStudent(){
    this.studentListArray().push(this.getStudentFields())
  }

  removeStudent(i: number){
    this.studentListArray().removeAt(i)
  }



  putNewSubject(){
    return new FormGroup({
      subject: new FormControl('',Validators.required),
      marks: new FormControl('',Validators.required)
    })
  }

 
  submit(){
    this.studentForm.markAllAsTouched()
   if(this.studentForm.invalid)return;

    this.dynamicFieldService.createNewStudentList(this.studentForm.value)
    .subscribe(res => {
      console.log(res)
      this.ngToastSrvc.success({detail: "Success Message",summary: "Added Successfully", duration: 5000})
      this.studentForm.reset()
      this.router.navigate(['/'])
    
    },err=>{
      this.ngToastSrvc.error({detail: "Error Message",summary: "Erro Message", duration: 5000})
    })

  }

  resetForm() {
    this.studentForm.reset();
    const studentListArray = this.studentForm.get('studentList') as FormArray;
    studentListArray.controls.forEach(student => {
      const subjectsFormArray = (student.get('studentSubjects') as FormGroup).controls['studentSubjectArray'] as FormArray;
      subjectsFormArray.clear(); 
    });
  }

  // getJson(){
  //   this.dynamicFieldService.fetchJSON().subscribe(res => {
  //     this.jsonData = res
  //     console.log(this.jsonData)
  // })
  // }
  handleCheckboxChange(studentIndex: number, checkboxName: string) {
    const student = this.studentListArray().at(studentIndex) as FormGroup;
    const firstCheckbox = student.get('first_checkbox');
    const secondCheckbox = student.get('second_checkbox');

    if (checkboxName === 'first_checkbox' && firstCheckbox?.value) {
      secondCheckbox?.setValue(false);
    } else if (checkboxName === 'second_checkbox' && secondCheckbox?.value) {
      firstCheckbox?.setValue(false);
    }
  }
  
}
