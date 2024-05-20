import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  selectedCountry: string;
  selectedCity: string;
  selectedSchool: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      country: string;
      city: string;
      school: string;
    };

    this.selectedCountry = state.country;
    this.selectedCity = state.city;
    this.selectedSchool = state.school;
  }

  ngOnInit(): void {}
}
