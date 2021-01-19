import { Component} from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-social',
  template: `<div  *ngIf="socialLinks?.length > 0" class="socials">
    <a class="p-1" *ngFor="let social of socialLinks" [href]="social.link" target="_blank" [attr.data-title]="social.title">
      <i class="mdi mdi-{{social.icon}}"></i>
    </a>
  </div>`
})
export class SocialComponent {
  socialLinks = [];
  constructor(private appService: AppService) {
    this.appService.socials().subscribe(data => {
      data.map(res => {
        if (res.active === true) {
          this.socialLinks.push(res);
        }
      });
    });
  }
}
