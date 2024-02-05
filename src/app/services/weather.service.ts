import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Forecast } from '../models/forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'MNB1N1K6222KFuzSXNU2ZIDsZzE0VjM4';

  constructor(private http: HttpClient) {}

  getDailyForecast(): Observable<Forecast[]> {
    const baseUrl = 'https://api.tomorrow.io/v4/timelines';
    const location = 'tbilisi';
    const startTime = new Date().toISOString();
    const endTime = new Date(new Date().getTime() + 5 * 24 * 60 * 59 * 1000).toISOString();

    const url = `${baseUrl}?location=${location}&fields=temperature&startTime=${startTime}&endTime=${endTime}&timesteps=1h`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
    });

    return this.http.get(url, { headers }).pipe(
      map((data: any) => {
        const hourlyIntervals = data?.data?.timelines[0]?.intervals;
        const dailyForecasts: Forecast[] = [];

        for (let i = 0; i < hourlyIntervals.length; i += 24) {
          const dailyForecast = {
            date: new Date(hourlyIntervals[i].startTime),
            values: hourlyIntervals.slice(i, i + 24),
          } as Forecast;
          dailyForecasts.push(dailyForecast);
        }

        return dailyForecasts;
      })
    );
  }
}
