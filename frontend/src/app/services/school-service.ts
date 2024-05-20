import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { School } from '../models/school.model';
import { City } from '../models/city.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private baseUrl = 'http://localhost/backend';

  constructor(private httpClient: HttpClient) {}

  fetchCountries(): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.baseUrl}/get_countries.php`)
      .pipe(
        map((data) => this.toCamelCase(data)),
        catchError((err, caught) => {
          throw new Error('Failed to fetch countries!');
        })
      );
  }

  fetchCities(countryId: number): Observable<City[]> {
    return this.httpClient
      .get<City[]>(`${this.baseUrl}/get_cities.php?country_id=${countryId}`)
      .pipe(
        map((data: City[]) => this.toCamelCase(data)),
        catchError((err, caught) => {
          throw new Error('Failed to fetch cities!');
        })
      );
  }

  fetchSchools(cityId: number): Observable<School[]> {
    return this.httpClient
      .get<School[]>(`${this.baseUrl}/get_schools.php?city_id=${cityId}`)
      .pipe(
        map((data: School[]) => this.toCamelCase(data)),
        catchError((err, caught) => {
          throw new Error('Failed to fetch schools!');
        })
      );
  }

  private toCamelCase(dataArray: any[]): any {
    return dataArray.map((data) => {
      const camelCaseData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const camelCaseKey = this.snakeToCamel(key);
          camelCaseData[camelCaseKey] = data[key];
        }
      }
      return camelCaseData;
    });
  }

  private snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  }
}
