import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  getInTouchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.getInTouchForm = this.fb.group({
      name: [, [Validators.required]],
      email: [, Validators.compose([Validators.required, Validators.email])],
      subject: [, [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  submitGetInTouch() {
    const getInTouchForm = {
      name: this.getInTouchForm.get('name').value,
      email: this.getInTouchForm.get('email').value,
      subject: this.getInTouchForm.get('subject').value,
      message: this.getInTouchForm.get('message').value,
    };
    if (this.getInTouchForm.invalid) {
      document.getElementById('mform').classList.add('input-error');
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant('ERR_MSG')
      })
    } else {
      document.getElementById('mform').classList.remove('input-error');
      this.service.getInTouchForm(getInTouchForm)
        .subscribe((response) => {
          this.getInTouchForm.reset();
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('SUCCESS_MSG_GET_IN_TOUCH'),
            showConfirmButton: false,
            timer: 3000
          })
          console.log("Yhc-Membership: ", response);
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('ERROR'),
            text: this.translate.instant('ERR_MSG')
          })
        }
        );
    }
  }

}
