import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  validationMessages = {
    fullName: {
      required: 'Full Name is required',
      minlength: 'Full Name must be less than 20 characters'
    },
    email: {
      required: 'Email is required',
      email: 'please enter valid email'
    },
    skillName: {
      required: 'Email is required'
    },
    experienceInYears: {
     required: 'Email is required'
    }
  };
  formErrors = {
    fullName: '',
    email: '',
    skillName : '',
    experienceInYears: ''
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      skillName: ['',  Validators.required],
      experienceInYears: ['',  Validators.required],
      proficiency: ['']
    });
    // this.userForm.valueChanges.subscribe((data)=>{
    //   this.logKeyValidationErrors(this.userForm);
    // })
  }
  onLoadDataClick(): void {
    // this.logValidationErrorMessages(this.userForm);
  }

  logValidationErrorMessages(group: FormGroup): void {
    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);
      // If the control is nested form group, recursively call
      // this same method
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrorMessages(abstractControl);
        // If the control is a FormControl
      } else {
        // Clear the existing validation errors
         this.formErrors[key] = '';
         if (abstractControl && !abstractControl.valid) {
          // Get all the validation messages of the form control
          // that has failed the validation
          const messages = this.validationMessages[key];
          // Find which validation has failed. For example required,
          // minlength or maxlength. Store that error message in the
          // formErrors object. The UI will bind to this object to
          // display the validation errors
          for (const errorKey in abstractControl.errors) {
            if (errorKey !== undefined) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
  onSubmit() {
    // this.submitted = true;
    this.logValidationErrorMessages(this.userForm);
    // stop here if form is invalid
    // if (this.userForm.invalid) {
      // return;
    // }
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value))
  }

}
