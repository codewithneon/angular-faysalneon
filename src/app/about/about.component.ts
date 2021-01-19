import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Title } from '@angular/platform-browser';
declare const $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  bio = {
    name: 'Faysal Neon',
    email: 'faysalneon@gmail.com',
    mobile: '+8801710327375',
    language: 'Bengali, English',
    freelance: 'Yes. I Do',
    nationality: 'Bangladeshi',
  };
  photo = 'assets/images/profile.jpg';
  intro = 'A Full-stack Mobile & Web Developer';
  details = 'Hi! I\'m Faysal Neon & I’m an innovative software engineer with 03 years of experience managing all aspects of the development process for small to medium-sized companies.';
  SkillList = [];
  resumeList = [];
  statisticsBg = '';
  statisticList = [];
  repeatslide = true;
  repeatCount = true;
  constructor(private appTitle: Title, private appService: AppService) {
    this.appTitle.setTitle('About Me');
    this.appService.setting().subscribe(data => {
      this.statisticsBg = data.statisticsBg;
    });
    appService.about().subscribe(data => {
      this.photo = data.photo;
      this.intro = data.intro;
      this.details = data.details;
      this.bio = data.bio;
    });
    appService.skills().subscribe(data => {
      data.map(res => {
        if (res.active === true) {
          this.SkillList.push(res);
        }
      });
    });
    appService.timeline().subscribe(data => {
      data.reverse().map(res => {
        if (res.active === true) {
          this.resumeList.push(res);
        }
      });
    });
    appService.statistics().subscribe(data => {
      data.map(res => {
        if (res.active === true) {
          this.statisticList.push(res);
        }
      });
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      $(window).on('load resize scroll', () => {
        const $slideArea = $('.section-skills');
        if (this.repeatslide === true && (
            ($slideArea.length ? $slideArea.offset().top : 0) -
            $(window).height() + Math.round($slideArea.height() / 2)) <= window.pageYOffset) {
          $('[data-slide]').each((key, el) => {
              const $slideMax = $(el).data('slide');
              const $countTitle = $(el).find('.count');
              const $countProgress = $(el).find('.progress-bar');
              $({ slideNumb: 0 }).animate({ slideNumb: $slideMax}, {
                  duration: 3000,
                  easing: 'swing',
                  step(): void {
                      const currPosition = Math.ceil(this.slideNumb);
                      $countTitle.text(currPosition + '%');
                      $countProgress.css('width', currPosition + '%');
                  },
                  complete(): void {
                      $countTitle.text($slideMax + '%');
                      $countProgress.css('width', $slideMax + '%');
                  }
              });
          });
          this.repeatslide = false;
        }
        // -> skills area
        const $countArea = $('.section-statistics');
        if (this.repeatCount === true && (
            ($countArea.length ? $countArea.offset().top : 0) -
            $(window).height() + Math.round($countArea.height() / 2)) <= window.pageYOffset) {
          $('[data-count]').each((key, el) => {
              const $countMax = $(el).data('count');
              $({ countNumb: 0 }).animate({ countNumb: $countMax}, {
                  duration: 8000,
                  easing: 'swing',
                  step(): void {
                      $(el).text(Math.ceil(this.countNumb));
                  },
                  complete(): void {
                      $(el).text($countMax);
                  }
              });
          });
          this.repeatCount = false;
        }
      });
    }, 1000);
  }
}
