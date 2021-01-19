import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import Typed from 'typed.js';
import { AppService } from '../app.service';
declare const particlesJS: any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  info = [];
  logo = 'assets/images/logo.png';
  intro = 'A Full-stack Mobile & Web Developer';
  homeBg = 'assets/images/home.jpg';
  welcome = 'Hi! I\'m Faysal Neon';
  constructor(private appTitle: Title, private ms: Meta, private appService: AppService) {
    this.appTitle.setTitle('Welcome To My Profile');
    this.appService.setting().subscribe(data => {
      this.logo = data.logo;
      this.homeBg = data.homeBg;
    });
    this.appService.about().subscribe(data => {
      this.info = data.info;
      this.intro = data.intro;
      this.welcome = data.welcome;
      this.ms.addTag({name: 'keywords', content: data.info});
      this.ms.addTag( {name: 'description', content: data.intro});
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      if (this.info.length > 0) {
        const typed = new Typed('#typed', {
          strings: this.info,
          cursorChar: '|',
          typeSpeed: 30,
          backSpeed: 30,
          loop: true
        });
      }
    }, 3000);
  }
  ngAfterViewInit(): void {
    particlesJS('particle', {
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#f3c26b'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3a3b3b',
          opacity: 0.5,
          width: 2
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
}
