import { Component, OnInit } from '@angular/core';
import { Forecast } from 'src/app/models/forecast';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  dailyForecasts: Forecast[] = [];
  selectedDay: number = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getDailyForecast().subscribe((data) => {
      this.dailyForecasts = data;
      this.selectDay(0);
    });
  }

  selectDay(index: number): void {
    this.selectedDay = index;
  }

  get selectedDayForecast(): any[] {
    return this.dailyForecasts[this.selectedDay]?.values || [];
  }
}
