import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { YhcService } from '../../yhc.service';

@Component({
  selector: 'app-yhc-membership',
  templateUrl: './yhc-membership.component.html',
  styleUrls: ['./yhc-membership.component.css']
})
export class YhcMembershipComponent implements OnInit {

  yhcForm: FormGroup;
  componentName = "yhc_membership"

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private service: YhcService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.yhcForm = this.fb.group({
      name: [, [Validators.required]],
      lastName: [, [Validators.required]],
      email: [, Validators.compose([Validators.required, Validators.email])],
      mobileNumber: [, [Validators.required]],
      address: ['', [Validators.required]],
      province: ['', [Validators.required]],
      street: [''],
      zipCode: ['']
    });
  }

  onSubmit() {
    const yhcData = {
      name: this.yhcForm.get('name').value,
      lastName: this.yhcForm.get('lastName').value,
      email: this.yhcForm.get('email').value,
      mobileNumber: this.yhcForm.get('mobileNumber').value,
      address: this.yhcForm.get('address').value,
      province: this.yhcForm.get('province').value,
      street: this.yhcForm.get('street').value,
      zipCode: this.yhcForm.get('zipCode').value
    };

    this.spinner.show();
    this.service.yhcMembership(yhcData)
      .subscribe((response) => {
        this.spinner.hide();
        this.yhcForm.reset();
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('SUCCESS_MSG_YHC'),
          showConfirmButton: false,
          timer: 3000
        })
        console.log("Yhc-Membership: ", response);
      }, (err) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('ERROR'),
          text: this.translate.instant('ERR_MSG')
        })
      }
      );
  }

}
