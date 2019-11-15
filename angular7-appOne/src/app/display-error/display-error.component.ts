import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.css']
})
export class DisplayErrorComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('contol') control: any;
  constructor() {
  }
  ngOnInit() {
    console.log(this.control);
  }

  // logValidationErrorMessages(group: FormGroup, formErrors: any = {}, validationMessages: any = {}): void {
  //   // Loop through each control key in the FormGroup
  //   Object.keys(group.controls).forEach((key: string) => {
  //     // Get the control. The control can be a nested form group
  //     const abstractControl = group.get(key);
  //     // If the control is nested form group, recursively call
  //     // this same method
  //     if (abstractControl instanceof FormGroup) {
  //       this.logValidationErrorMessages(abstractControl);
  //       // If the control is a FormControl
  //     } else {
  //       // Clear the existing validation errors
  //       formErrors[key] = '';
  //       if (abstractControl && !abstractControl.valid) {
  //         // Get all the validation messages of the form control
  //         // that has failed the validation
  //         const messages = validationMessages[key];
  //         // Find which validation has failed. For example required,
  //         // minlength or maxlength. Store that error message in the
  //         // formErrors object. The UI will bind to this object to
  //         // display the validation errors
  //         for (const errorKey in abstractControl.errors) {
  //           if (errorKey !== undefined) {
  //             formErrors[key] += messages[errorKey] + ' ';
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

}
