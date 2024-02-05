import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'MNB1N1K6222KFuzSXNU2ZIDsZzE0VjM4';

  constructor(private http: HttpClient) {}

  getMinuteForecast(): Observable<any> {
    const baseUrl = 'https://api.tomorrow.io/v4/timelines';
    const location = 'tbilisi';
    const startTime = new Date().toISOString();
    const endTime = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString();

    const url = `${baseUrl}?location=${location}&fields=temperature&startTime=${startTime}&endTime=${endTime}&timesteps=1h`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
    });

    return this.http.get(url, { headers });
  }
}
