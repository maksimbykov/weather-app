import { Component, OnInit } from '@angular/core';
import { Forecast } from 'src/app/models/forecast';
import { WeatherService } from '../../services/weather.service';
import { WeatherStateService } from '../../services/weather-state.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  dailyForecasts: Forecast[] = [];
  selectedDay: number = 0;

  constructor(
    private weatherService: WeatherService,
    public weatherStateService: WeatherStateService
  ) {}

  ngOnInit(): void {
    this.weatherStateService.onTransition((state: any) => {
      if (state.matches('loading')) {
        this.weatherService.getDailyForecast().subscribe((data) => {
          this.dailyForecasts = data;
          this.weatherStateService.send('LOADED');
        });
      }
    });

  }

  selectDay(index: number): void {
    this.weatherStateService.send('SELECT_DAY');
    this.selectedDay = index;
  }

  goBack(): void {
    this.weatherStateService.send('BACK');
  }

  get selectedDayForecast(): any[] {
    return this.dailyForecasts[this.selectedDay]?.values || [];
  }
}
