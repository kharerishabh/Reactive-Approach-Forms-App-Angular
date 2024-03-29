import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Max', 'Anna']

  constructor(private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      gender: new FormControl('male'),
      'hobbies': new FormArray([])
    });
    //Value Changes for track the value
    this.signupForm.valueChanges.subscribe((value) => console.log(value))

    //Status Changes for track the status
    this.signupForm.statusChanges.subscribe((status) => console.log(status))
    this.signupForm.setValue({
      userData: {
        'username': 'Rishabh',
        'email': 'ris@gmail.com'
      },
      'gender': 'male',
      'hobbies': []
    })
    this.signupForm.patchValue({
      userData: {
        'username': 'sakshi'
      }
    })
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({'username': '', 'email': '', 'gender': 'male'})
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  getControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForBidden': true}
    }
    return null
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForBidden': true})
        }else{
          resolve(null)
        }
      }, 1500)
    })
    return promise
  }
}
