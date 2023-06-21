import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
register(); //https://swiperjs.com/swiper-api#method-swiper-slideNext

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  public slideData: any[] = [
    {
      imageUrl: "assets/images/onboarding/slide-1.png",
      title: "Ease of Use and Accessibility",
      description: "Ensure that the app is user-friendly and accessible for individuals with different abilities. Consider accommodating alternative biometric methods or providing options for individuals who may have difficulty using certain modalities.",
      action: {
        url: "#",
        text: "Continue",
        status: "continue"
      }
    },
    {
      imageUrl: "assets/images/onboarding/slide-2.png",
      title: "Security and Privacy",
      description: "Biometric data is sensitive information, so it's crucial to prioritize security and privacy. Implement strong encryption and storage protocols to safeguard the biometric data and ensure compliance with relevant data protection regulations.",
      action: {
        url: "#",
        text: "Continue",
        status: "continue"
      }
    },
    {
      imageUrl: "assets/images/onboarding/slide-3.png",
      title: "Data Analytics and Reporting",
      description: "Implement features that allow managers or administrators to view and analyze the data collected by the app. This can provide insights into agent attendance, performance, and overall workforce management.",
      action: {
        url: "#",
        text: "Continue",
        status: "continue"
      }
    },
    {
      imageUrl: "assets/images/onboarding/slide-4.png",
      title: "Continuous Improvements",
      description: "Regularly update the app to address any bugs, security vulnerabilities, or usability issues. Seek feedback from users to identify areas for improvement and incorporate their suggestions into future updates.",
      action: {
        url: "/home",
        text: "Get Started",
        status: "completed"
      }
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  continue(status: string) {
    if(status === 'completed') {
      let timestamp: any = new Date().getTime();
      localStorage.setItem('app-onboarding-completed', timestamp);
      this.router.navigateByUrl('/home');
    } else {
      this.swiperRef?.nativeElement.swiper.slideNext(700);
    }
  }
}
