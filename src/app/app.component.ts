import { Component } from '@angular/core';
import { LanguageRecommendationService } from './services/language-recommendation.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appTypeOption: 'web' | 'mobile' | 'desktop' = 'web';
  public appSizeOption: 'small' | 'medium' | 'large' = 'small';

  public appTypeOptions: any[] = [
    { label: 'Web App', value: 'web' },
    { label: 'Mobile App', value: 'mobile' },
    { label: 'Desktop App', value: 'desktop' },
  ];

  public appSizeOptions: any[] = [
    { label: 'Small Project', value: 'small' },
    { label: 'Medium Project', value: 'medium' },
    { label: 'Large Project', value: 'large' },
  ];

  public recommendation: string = '';
  public loading: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private languageRecommendationService: LanguageRecommendationService
  ) {
    this.primengConfig.ripple = true;
  }

  public getRecommendation() {
    this.loading = true;

    const inputData = {
      web: 0,
      mobile: 0,
      desktop: 0,
      small: 0,
      medium: 0,
      large: 0,
    };

    inputData[this.appTypeOption] = 1;
    inputData[this.appSizeOption] = 1;

    setTimeout(() => {
      this.languageRecommendationService
        .recommendLanguage(inputData)
        .subscribe({
          next: (response) => {
            this.loading = false;
            console.log(response); // Handle the response accordingly
            this.recommendation = response.recommendedLanguage; // Assuming the backend returns { recommendedLanguage: '...' }
          },
          error: (error) => {
            this.loading = false;
            console.error(error);
          },
        });
    }, 3000);
  }
}
