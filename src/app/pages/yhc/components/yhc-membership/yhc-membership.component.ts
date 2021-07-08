import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageService } from 'src/app/pages/page.service';
import Swal from 'sweetalert2';
import { YhcService } from '../../yhc.service';

@Component({
  selector: 'app-yhc-membership',
  templateUrl: './yhc-membership.component.html',
  styleUrls: ['./yhc-membership.component.css']
})
export class YhcMembershipComponent implements OnInit {

  yhcForm: FormGroup;
  componentName = "yhc_membership";
  provinces;
  districts$;
  provinceName;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private service: YhcService,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.yhcForm = this.fb.group({
      name: [, [Validators.required]],
      lastName: [, [Validators.required]],
      nidNumber: [, [Validators.required]],
      provinceName: [, [Validators.required]],
      districtName: [, [Validators.required]],
      villageNumber: [, [Validators.required]],
      gender: [, [Validators.required]],
      dateOfBirth: [, [Validators.required]],
      birthPlace: [, [Validators.required]],
      qualification: [, [Validators.required]],
      academicField: ['', [Validators.required]],
      university: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: [, Validators.compose([Validators.required, Validators.email])],
      languages: ['', [Validators.required]],
      jobExperiance: ['', [Validators.required]],
      socialActivity: ['', [Validators.required]],
      job: ['', [Validators.required]],

    });

    this.getProvinces();
  }

  onSubmit() {
    if (this.yhcForm.invalid) {
      document.getElementById('mform').classList.add('input-error');
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant('ERR_MSG')
      })
    } else {
      document.getElementById('mform').classList.remove('input-error');
      const data = JSON.parse(JSON.stringify((this.yhcForm.value)));
      data.published_at = null;
      data.provinceName = this.provinceName;
      this.service.yhcMembership(data).subscribe(res => {
        this.yhcForm.reset();
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('SUCCESS_MSG_YHC'),
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

  getProvinces() {
    this.provinces = this.pageService.getProvinces();
  }

  getDistricts(provinceId) {
    console.log(provinceId);
    const province = this.provinces.find((element) => {
      if (element.id == provinceId) {
        console.log(element)
        return element.name;
      }
    });
    this.provinceName = province.name;
    this.districts$ = this.pageService.getDistricts(provinceId);
  }

}
