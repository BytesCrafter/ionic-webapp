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
      title: "Welcome",
      description: "The ionic app is a practical preview of the ionic framework in action, and a demonstration of proper code use.",
      action: {
        url: "#",
        text: "Continue",
        status: "continue"
      }
    },
    {
      imageUrl: "assets/images/onboarding/slide-2.png",
      title: "What is Ionic?",
      description: "An open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      action: {
        url: "#",
        text: "Continue",
        status: "continue"
      }
    },
    {
      imageUrl: "assets/images/onboarding/slide-3.png",
      title: "What is Appflow?",
      description: "A powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.",
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
