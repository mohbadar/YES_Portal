import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageService } from 'src/app/pages/page.service';
import Swal from 'sweetalert2';
import { YhcService } from '../../yhc.service';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {

  electionForm: FormGroup;
  componentName = "elections";
  type;
  currentProvinces;
  currentDistricts$;
  origanalProvinces;
  origanalDistricts$;
  photo;
  originalProvinceName;
  currentProvinceName;
  title;
  lang;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private service: YhcService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) {

    this.lang = this.translate.currentLang;
    if (this.lang === 'en') {
      this.router.navigateByUrl('/');
    }
    this.route.params.subscribe((params) => {
      this.type = params['type']
      console.log("🚀 ~ file: elections.component.ts ~ line 29 ~ ElectionsComponent ~ this.route.params.subscribe ~ type", this.type);

    })
  }

  ngOnInit() {
    this.intializeForm();
    this.getCurrentProvinces();
    this.getOriginalProvinces();

    // if (this.type === 'zone-elections') {
    //   this.title = this.translate.instant('ZONE_MESSAGE')
    // }



  }
  intializeForm() {
    this.electionForm = this.fb.group({
      name: [, [Validators.required]],
      lastName: [, [Validators.required]],
      fatherName: [, [Validators.required]],
      nidNumber: [, [Validators.required]],
      gender: [, [Validators.required]],
      dateOfBirth: [, [Validators.required]],
      age: [, [Validators.required]],
      originalProvince: [, [Validators.required]],
      originalDistrict: [, [Validators.required]],
      originalVillage: [, [Validators.required]],
      currentProvince: [, [Validators.required]],
      currentDistrict: [, [Validators.required]],
      currentVillage: [, [Validators.required]],
      languages: [, [Validators.required]],
      email: [, Validators.compose([Validators.required, Validators.email])],
      mobileNumber: [, [Validators.required]],
      university: ['', [Validators.required]],
      academicField: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      job: ['', [Validators.required]],
      politicalParty: ['', [Validators.required]],
      civilSociety: ['', [Validators.required]],
      image: [, Validators.required],
    });
  }

  onSubmit() {
    if (this.electionForm.invalid) {
      document.getElementById('mform').classList.add('input-error');
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant('ERR_MSG')
      })
    } else {
      document.getElementById('mform').classList.remove('input-error');
      const data = JSON.parse(JSON.stringify((this.electionForm.value)));
      data.published_at = null;
      data.originalProvince = this.originalProvinceName;
      data.currentProvince = this.currentProvinceName;
      console.log("🚀 ~ file: elections.component.ts ~ line 90 ~ ElectionsComponent ~ onSubmit ~ data", data)

      // this.getProvinceName(data.originalProvince);

      const formData = new FormData();
      formData.append(`files.photo`, this.photo, this.photo.name);
      formData.append('data', JSON.stringify(data));
      this.service.electionsRegistration(this.type, formData).subscribe(res => {
        this.electionForm.reset();
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('SUCCESS_MSG_ELECTIONS'),
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

  getCurrentProvinces() {
    this.currentProvinces = this.pageService.getProvinces();
    console.log("🚀 ~ file: elections.component.ts ~ line 92 ~ ElectionsComponent ~ getProvinces ~ provinces", this.currentProvinces)

  }
  getOriginalProvinces() {
    this.origanalProvinces = this.pageService.getProvinces();
    console.log("🚀 ~ file: elections.component.ts ~ line 92 ~ ElectionsComponent ~ getProvinces ~ provinces", this.origanalProvinces)

  }

  getOriginalDistricts(provinceId) {
    console.log(provinceId);

    const province = this.origanalProvinces.find((element) => {
      if (element.id == provinceId) {
        console.log(element)
        return element.name;
      }
    });
    this.originalProvinceName = province.name;
    // this.electionForm.controls['originalProvince'].setValue(province.name);
    this.origanalDistricts$ = this.pageService.getDistricts(provinceId);
  }

  getCurrentDistricts(provinceId) {
    console.log(provinceId);

    const province = this.currentProvinces.find((element) => {
      if (element.id == provinceId) {
        console.log(element)
        return element.name;
      }
    });
    this.currentProvinceName = province.name;
    // this.electionForm.controls['currentDistrict'].setValue(province.name);
    this.currentDistricts$ = this.pageService.getDistricts(provinceId);
  }

  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      this.photo = event.target.files[0];
    }
  }



}
