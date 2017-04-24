import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SWIHSItem, SWIHeader } from "../../../../../app/models/app.models";
import { SWIFileService } from "../../../../services/swi-file.service";

@Component({
  selector: 'swi-hs-picker',
  templateUrl: './swi-hs-picker.component.html',
  styleUrls: ['./swi-hs-picker.component.css']
})
export class SwiHsPickerComponent implements OnInit {

  title: string = "Health & Safety Items - Picker";
  swi: SWIHeader;
  options: SWIHSItem[] = [];
  selectedOptions: SWIHSItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swiService: SWIFileService
  ) {
    this.options = this.route.snapshot.data['hsitems'];
    this.swi = this.route.snapshot.data['swi'];
    this.title = `SWI Builder - ${this.swi.title} - Edit Health & Safety Items`;
    this.selectedOptions = this.swi.swihsItems;
  }

  ngOnInit() {
  }

  onBackButton() {
    this.selectionComplete();
  }

  toggleSelection(item: SWIHSItem) {
    if (this.selectedOptions.filter(i => i.id == item.id).length > 0) {
      this.selectedOptions = this.selectedOptions.filter(i => i.id != item.id);
    } else {
      this.selectedOptions.push(item);
    }
  }

  isSelected(item: SWIHSItem): boolean {
    return this.selectedOptions.filter(i => i.id == item.id).length > 0;
  }

  selectionComplete() {
    this.swi.swihsItems = this.selectedOptions;
    this.swiService.saveFile(this.swi).then(() => {
      this.router.navigate(['swibuilder', this.swi.id]);
    });
  }
}
