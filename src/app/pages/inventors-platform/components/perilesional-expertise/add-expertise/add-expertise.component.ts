import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expertise',
  templateUrl: './add-expertise.component.html',
  styleUrls: ['./add-expertise.component.css']
})
export class AddExpertiseComponent implements OnInit {


  expertiseForm: FormGroup;
  photos: File;
  componentName = "perilesional_expertises";

  constructor(
    private fb: FormBuilder,
    private service: PageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.expertiseForm = this.fb.group({
      name: [, Validators.required],
      title: [, Validators.required],
      contents: [, Validators.required],
      mobileNumber: [, Validators.required],
      email: [, Validators.compose([Validators.required, Validators.email])]
    });
  }

  submitExpertiseForm() {
    if (this.expertiseForm.invalid) {
      document.getElementById('mform').classList.add('input-error');
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant('ERR_MSG')
      })
    } else {
      document.getElementById('mform').classList.remove('input-error');
      const data = this.expertiseForm.value;
      data.published_at = null;
      const formData = new FormData();
      formData.append(`files.photos`, this.photos, this.photos.name);
      formData.append('data', JSON.stringify(data));
      this.service.submitEcpertiseForm(formData).subscribe(res => {
        this.expertiseForm.reset();
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
    console.log("🚀 ~ file: add-inventor.component.ts ~ line 74 ~ AddInventorComponent ~ uploadAttachement ~ event", event)

    if (event.target.files && event.target.files[0]) {
      this.photos = event.target.files[0];
      console.log("🚀 ~ file: add-inventor.component.ts ~ line 76 ~ AddInventorComponent ~ uploadAttachement ~ attachment", this.photos)
    }

  }

}
