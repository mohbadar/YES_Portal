import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.css']
})
export class ComplainsComponent implements OnInit {

  complainForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.complainForm = this.fb.group({
      name: [, [Validators.required]],
      email: [, Validators.compose([Validators.required, Validators.email])],
      subject: [, [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  submitComplainForm() {
    const complainData = {
      name: this.complainForm.get('name').value,
      email: this.complainForm.get('email').value,
      subject: this.complainForm.get('subject').value,
      message: this.complainForm.get('message').value,
    };
    if (this.complainForm.invalid) {
      document.getElementById('mform').classList.add('input-error');
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant('ERR_MSG')
      })
    } else {
      document.getElementById('mform').classList.remove('input-error');
      this.service.complainForm(complainData)
        .subscribe((response) => {
          this.complainForm.reset();
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('SUCCESS_MSG_COMPLAIN'),
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
