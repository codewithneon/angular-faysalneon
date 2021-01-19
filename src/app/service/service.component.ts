import { Component, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { Title } from '@angular/platform-browser';
declare const $: any;
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements AfterViewInit {
  clientBg = '';
  clientList = [];
  serivceList = [];
  constructor(private appTitle: Title, private appService: AppService) {
    this.appTitle.setTitle('My Service');
    this.appService.setting().subscribe(data => {
      this.clientBg = data.clientBg;
    });
    this.appService.services().subscribe(data => {
      data.map(res => {
        if (res.active === true) {
          this.serivceList.push(res);
        }
      });
    });
    this.appService.clients().subscribe(data => {
      data.map(res => {
        if (res.active === true) {
          this.clientList.push(res);
        }
      });
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      $('[data-clientList]').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '.trigger .btn-prev',
        nextArrow: '.trigger .btn-next',
        responsive: [
          {
            breakpoint: 4800,
            settings: {
              slidesToShow: 6
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
   }, 1000);
  }
}
