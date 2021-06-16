import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-yhc-membership',
  templateUrl: './yhc-membership.component.html',
  styleUrls: ['./yhc-membership.component.css']
})
export class YhcMembershipComponent implements OnInit {

  yhcForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.yhcForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      mobileNumber: [null, [Validators.required]],
      address: this.fb.group({
        address: [''],
        province: [''],
        street: [''],
        zip: ['']
      }),
    });
  }

  onSubmit() {
    const yhcData = {
      firstName: this.yhcForm.get('firstName').value,
      lastName: this.yhcForm.get('lastName').value,
      email: this.yhcForm.get('email').value,
      mobileNumber: this.yhcForm.get('mobileNumber').value,
      address: this.yhcForm.get('address').value
    };
    console.log("🚀 ~ file: yhc-membership.component.ts ~ line 33 ~ YhcMembershipComponent ~ onSubmit ~ yhcData", yhcData)

  }

}
