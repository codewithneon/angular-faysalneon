import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
declare const $: any;
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit{
  logo = '';
  title = '';
  appMenu = [];
  routing = false;
  routePage = false;
  thisYear = (new Date()).getFullYear();
  constructor(
    private router: Router,
    private appService: AppService) {
      this.appService.setting().subscribe(data => {
        this.appMenu = data.menu;
        this.logo = data.logo;
      });
      appService.about().subscribe(data => {
        this.title = data.bio.name;
      });
      this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.routing = true;
          this.routePage = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.routing = false;
            this.routePage = false;
          }, 1500);
          break;
        }
        default: { break; }
      }
    });
  }
  ngOnInit(): void {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 80) {
        $('.scroll-up:hidden').stop(true, true).fadeIn();
      } else {
        $('.scroll-up').stop(true, true).fadeOut();
      }
    });
  }
}
