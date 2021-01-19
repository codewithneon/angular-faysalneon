import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
declare const $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  emailList = [];
  skypeList = [];
  messangerList = [];
  status = {
    text: '',
    active: false,
    color: 'danger'
  };
  dummy = {};
  reqForm: FormGroup;
  constructor(
    private appTitle: Title,
    private appService: AppService,
    public formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    public db: AngularFireDatabase
    ) {
    this.appTitle.setTitle('Contact With Me');
    this.appService.about().subscribe(data => {
      this.emailList = data.contact.email;
      this.skypeList = data.contact.skype;
      this.messangerList = data.contact.messanger;
    });
    this.reqForm = formBuilder.group({
      date: [formatDate(new Date(), 'HH:MM - DD/MM/YYYY', 'en')],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(255),
        // Validators.email '@' Or '@.'
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ])],
      mobile: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^[0-9\-\(\)\/\+\s]*$/)
      ])],
      company: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(80),
        Validators.pattern(/^[0-9a-zA-Z\_]+$/)
      ])],
      subject: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ])],
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255),
      ])]
    });
  }
  newQuery(): void{
    if (!(this.reqForm.pristine || this.reqForm.invalid)) {
      this.appService.requestSubmit(this.reqForm.value);
      this.reqForm.reset();
      setTimeout(() => {
        this.status = {
          active: true,
          color: 'success',
          text: 'Thank you For Query',
        };
        setTimeout(() => {
          this.status.active = false;
        }, 7000);
      }, 3000);
    }
  }
  sanitize(url: string): any{
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnInit(): void{
    $('.form-control').focus(() => {
      $(this).parent('.form-group').addClass('active');
    }).blur(() => {
      if (!($(this).val())) { $(this).parent('.form-group').removeClass('active'); }
    });
  }
}
