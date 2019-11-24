import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserInfo from '../../types/UserInfo';

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

@Component
export default class FetchDataComponent extends Vue {
    forecasts: WeatherForecast[] = [];

    get userName() {
        return this.$store.state.user ? this.$store.state.user.name : null ;
    }

    mounted() {
        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.forecasts = data;
            });
    }
}
