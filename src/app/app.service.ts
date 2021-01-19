import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceInterface, ClientInterface } from './service/service.interface';
import { PortfolioInterface, TestimonialInterface } from './portfolio/portfolio.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { SocialInterface } from './xtra/social/social.interface';
import { TimlineInterface, SkillInterface } from './about/about.interface';
@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient, public db: AngularFireDatabase) { }
  requestSubmit(data): void {
    this.db.list('request').push(data);
  }
  setting(): Observable<any> {
    return this.http.get<any>('assets/settings.json');
  }
  socials(): Observable<SocialInterface[]> {
    return this.http.get<SocialInterface[]>(this.db.list('/socials').query + '.json');
  }
  about(): Observable<any> {
    return this.http.get<any>(this.db.list('/about').query + '.json');
  }
  skills(): Observable<SkillInterface[]> {
    return this.http.get<SkillInterface[]>(this.db.list('/skills').query + '.json');
  }
  timeline(): Observable<TimlineInterface[]> {
    return this.http.get<TimlineInterface[]>(this.db.list('/timeline').query + '.json');
  }
  statistics(): Observable<any> {
    return this.http.get<any>(this.db.list('/statistics').query + '.json');
  }
  services(): Observable<ServiceInterface[]> {
    return this.http.get<ServiceInterface[]>(this.db.list('/services').query + '.json');
  }
  clients(): Observable<ClientInterface[]> {
    return this.http.get<ClientInterface[]>(this.db.list('/client').query + '.json');
  }
  portfolio(): Observable<PortfolioInterface> {
    return this.http.get<PortfolioInterface>(this.db.list('/portfolio').query + '.json');
  }
  testimonial(): Observable<TestimonialInterface[]> {
    return this.http.get<TestimonialInterface[]>(this.db.list('/testimonial').query + '.json');
  }
}
