import { DynamicFieldService } from './../services/dynamicfield.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent {

  form: FormGroup = new FormGroup({
    list: new FormArray([this.getFields()]),
  })

  constructor(
    private dynamicFieldService: DynamicFieldService,
    private ngToastSrvc: NgToastService,
    private router: Router
  ){}



  getFields(): FormGroup{
    return new FormGroup({
      adminId: new FormControl('', Validators.required),
      flashscoreId: new FormControl('', Validators.required),
      espnId: new FormControl('', Validators.required),
      first_checkbox: new FormControl(false),
      second_checkbox: new FormControl(false)
    })
  }

  fieldsArray() {
    return this.form.get('list') as FormArray
  }

  addField(){
    this.fieldsArray().push(this.getFields())
  }

  removeFields(i: number){
    this.fieldsArray().removeAt(i)
  }


  submit(){
   this.form.markAllAsTouched()
   if(this.form.invalid)return;

    this.dynamicFieldService.createNewList(this.form.value)
    .subscribe(res => {
      console.log(res)
      this.ngToastSrvc.success({detail: "Success Message",summary: "Added Successfully", duration: 5000})
      this.form.reset()
      this.router.navigate(['/'])
    })

  }

  resetForm() {
    this.form.reset();
    const studentListArray = this.form.get('list') as FormArray;
    studentListArray.controls.forEach(student => {
      const subjectsFormArray = (student.get('studentSubjects') as FormGroup).controls['studentSubjectArray'] as FormArray;
      subjectsFormArray.clear();
    });
  }

  handleCheckboxChange(studentIndex: number, checkboxName: string) {
    const student = this.fieldsArray().at(studentIndex) as FormGroup;
    const firstCheckbox = student.get('first_checkbox');
    const secondCheckbox = student.get('second_checkbox');

    if (checkboxName === 'first_checkbox' && firstCheckbox?.value) {
      secondCheckbox?.setValue(false);
    } else if (checkboxName === 'second_checkbox' && secondCheckbox?.value) {
      firstCheckbox?.setValue(false);
    }
  }

}
