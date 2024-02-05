import { Measurements } from "./measurements";

export interface Forecast {
    date: Date;
    values: Measurements[];
}