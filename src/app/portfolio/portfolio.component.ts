import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Title } from '@angular/platform-browser';
declare const $: any;
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  currSector = 0;
  testimonial = [];
  viewItem = false;
  portfolioItems = [];
  portfolioSector = [];
  constructor(private appTitle: Title, private appService: AppService) {
    this.appTitle.setTitle('My Portfolio');
    this.appService.portfolio().subscribe(data => {
      data.sector.map(res => {
        if (res.active === true) {
          this.portfolioSector.push(res);
        }
      });
      data.works.map(res => {
        if (res.active === true) {
          this.portfolioItems.push(res);
        }
      });
    });
    this.appService.testimonial().subscribe(data => {
      data.map(res => {
        if (res.active === true) {
          this.testimonial.push(res);
        }
      });
    });
  }
  previewItem(alterText, viewImage, TargetLink): void {
    if (TargetLink) {
      window.open(TargetLink);
    } else {
        const previewBox = $('#lightBox');
        previewBox.find('.modal-content').html('');
        if (viewImage) {
          previewBox.find('.modal-content').html(`
            <i data-dismiss="modal" style="right:0; top:-8px; font-size:30px;cursor:pointer" class="text-dark dismiss mdi mdi-close-box position-absolute"></i>
            <img class="item-preview" src="${viewImage}" alt="${alterText}" width="100%" height="auto">
          `);
        } else {
          previewBox.find('.modal-content').html(`<div class="modal-body">
            <i data-dismiss="modal" style="right:0; top:-8px; font-size:30px;cursor:pointer" class="text-dark dismiss mdi mdi-close-box position-absolute"></i>
            <h2 class='m-0 text-dark text-center'>No Preview Available</h2>
          </div>`);
        }
        previewBox.modal('show');
    }
  }
}
