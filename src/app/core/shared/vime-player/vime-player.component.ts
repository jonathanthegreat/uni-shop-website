import {Component, Input, ViewChild} from '@angular/core';
import {Player} from '@vime/angular';
import {Translation} from '@vime/core';

// persian translation.
export const fa: Translation | any = {
  play: 'پخش',
  pause: 'توقف',
  mute: 'بی‌صدا',
  settings: 'تنظیمات',
  Miniplayer: 'پنجره در پنجره',
  Enterfullscreen: 'تمام صفحه',
};

// english translation.
export const en: Translation | any = {
  play: 'play',
  pause: 'pause',
  mute: 'mute',
  settings: 'settings',
  Miniplayer: 'Miniplayer',
  Enterfullscreen: 'Enterfullscreen',
};

@Component({
  selector: 'app-vime-player',
  templateUrl: './vime-player.component.html',
  styleUrls: ['./vime-player.component.scss']
})
export class VimePlayerComponent {
  link: any;
  posterLink: any;
  @ViewChild('player') player!: Player;
  translations = {fa, en};

  constructor() {
  }

  @Input() set hlsLink(value: any) {
    this.link = value;
  }

  @Input('poster') set poster(value: any) {
    this.posterLink = value;
  }

  onReady() {
    this.player.extendLanguage('fa', fa);
    this.player.extendLanguage('en', en);
  }

}
