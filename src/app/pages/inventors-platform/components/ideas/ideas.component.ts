import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {

  ideaForm: FormGroup;
  attachment: File;
  componentName = "ideas";

  constructor(
    private fb: FormBuilder,
    private service: PageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.ideaForm = this.fb.group({
      name: [, Validators.required],
      subject: [, Validators.required],
      mobileNumber: [, Validators.required],
      email: [, Validators.compose([Validators.required, Validators.email])],
      attachmentIdeas: [, Validators.required],

    });
  }

  submitIdeaForm() {
    if (this.ideaForm.invalid) {
      document.getElementById('mform').classList.add('input-error');
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant('ERR_MSG')
      })
    } else {
      document.getElementById('mform').classList.remove('input-error');
      const data = this.ideaForm.value;
      data.published_at = null;
      const formData = new FormData();
      formData.append(`files.attachment`, this.attachment, this.attachment.name);
      formData.append('data', JSON.stringify(data));
      this.service.submitIdearForm(formData).subscribe(res => {
        this.ideaForm.reset();
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('SUCCESS_MSG'),
          showConfirmButton: false,
          timer: 1500
        })
      },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('ERROR'),
            text: this.translate.instant('ERR_MSG')
          })
        });
    }
  }

  uploadAttachement(event) {
    if (event.target.files && event.target.files[0]) {
      this.attachment = event.target.files[0];
    }
  }

}
