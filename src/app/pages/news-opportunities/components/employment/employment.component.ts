import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NewsOpportunitiesService } from '../../news-opportunities.service';

@Component({
    selector: 'app-employment',
    templateUrl: './employment.component.html',
    styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {

    employmentForm: FormGroup;
    cv: File;

    constructor(
        private fb: FormBuilder,
        private translate: TranslateService,
        private newsOpportunitiesService: NewsOpportunitiesService
    ) { }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.employmentForm = this.fb.group({
            name: [, Validators.required],
            lastName: [, Validators.required],
            fatherName: [, Validators.required],
            nidNumber: [, Validators.required],
            gender: ["", Validators.required],
            dateOfBirth: [],
            mobileNumber: [, Validators.required],
            email: [, Validators.compose([Validators.required, Validators.email])],
            address: [],
            degree: ["", Validators.required],
            academicField: [],
            workExperience: [],
            languages: [],
            skill: [],
            cv: [, Validators.required],

        });
    }

    submitEmploymentForm() {
        if (this.employmentForm.invalid) {
            document.getElementById('mform').classList.add('input-error');
            Swal.fire({
                icon: 'error',
                title: this.translate.instant('ERROR'),
                text: this.translate.instant('ERR_MSG')
            })
        } else {
            document.getElementById('mform').classList.remove('input-error');
            const data = this.employmentForm.value;
            const formData = new FormData();
            formData.append(`files.CV`, this.cv, this.cv.name);
            formData.append('data', JSON.stringify(data));
            this.newsOpportunitiesService.uploadApplication(formData).subscribe(res => {
                this.employmentForm.reset();
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

    uploadCV(event) {
        console.log("🚀 ~ file: employment.component.ts ~ line 44 ~ EmploymentComponent ~ uploadCV ~ event", event)
        if (event.target.files && event.target.files[0]) {
            this.cv = event.target.files[0];
            console.log("🚀 ~ file: employment.component.ts ~ line 50 ~ EmploymentComponent ~ uploadCV ~ this.cv", this.cv)
        }
    }

}
