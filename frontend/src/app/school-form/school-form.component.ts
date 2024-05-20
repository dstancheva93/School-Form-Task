import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../models/country.model';
import { City } from '../models/city.model';
import { School } from '../models/school.model';
import { SchoolService } from '../services/school-service';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css'],
})
export class SchoolFormComponent implements OnInit {
  selectedCountry: Country;
  selectedCity: City;
  selectedSchool: School;

  form: FormGroup;
  countries: Country[] = [];
  cities: City[] = [];
  schools: School[] = [];

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchCountries();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.get('country')?.markAsTouched();
      this.form.get('city')?.markAsTouched();
      this.form.get('school')?.markAsTouched();
      return;
    }

    const selectedCountry = this.form.get('country')?.value.name;
    const selectedCity = this.form.get('city')?.value.name;
    const selectedSchool = this.form.get('school')?.value.name;
    this.router.navigate(['/summary'], {
      state: {
        country: selectedCountry,
        city: selectedCity,
        school: selectedSchool,
      },
    });
  }

  fetchCountries(): void {
    this.schoolService.fetchCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });
  }

  fetchCities(): void {
    if (this.selectedCountry) {
      this.schoolService
        .fetchCities(this.selectedCountry.id)
        .subscribe((data: City[]) => {
          this.cities = data;
        });
    }
  }

  fetchSchoolsForCity(): void {
    if (this.selectedCity) {
      this.schoolService
        .fetchSchools(this.selectedCity.id)
        .subscribe((data: School[]) => {
          this.schools = data;
        });
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      school: ['', Validators.required],
    });
  }
}
