import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';
@Component({ selector: 'app-root', template: `<router-outlet></router-outlet>`})
export class AppComponent{
  constructor(private ms: Meta) {
    this.ms.addTags([
      {name: 'robots', content: 'index, follow'}
    ]);
  }
}
