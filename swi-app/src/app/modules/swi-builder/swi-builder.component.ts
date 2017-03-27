import { Component, OnInit } from '@angular/core';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component({
  selector: 'app-swi-builder',
  templateUrl: './swi-builder.component.html',
  styleUrls: ['./swi-builder.component.scss'],
  animations: [slideToLeft()],
  host: { '[@slideToLeft]': '' }
})
export class SwiBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
