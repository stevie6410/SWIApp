import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'swi-properties-panel',
  templateUrl: './swi-properties-panel.component.html',
  styleUrls: ['./swi-properties-panel.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(1000, style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(1000, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(1000, style({ height: '*' }))
      ])
    ])
  ]
})
export class SwiPropertiesPanelComponent implements OnInit {

  @Output() onClose = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit();
  }

}
