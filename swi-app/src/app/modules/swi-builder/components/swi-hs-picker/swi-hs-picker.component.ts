import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SWIHSItem, SWIHeader } from "../../../../../app/models/app.models";
import { SWIHSItemService } from "../../services/swi-hs.service";
import { SWIFileService } from "../../../../services/swi-file.service";

@Component({
  selector: 'swi-hs-picker',
  templateUrl: './swi-hs-picker.component.html',
  styleUrls: ['./swi-hs-picker.component.css']
})
export class SwiHsPickerComponent implements OnInit {

  title: string = "Health & Safety Items - Picker";
  filename: string;
  swi: SWIHeader;
  options: SWIHSItem[] = [];
  selectedOptions: SWIHSItem[] = [];

  constructor(
    private hsItemsService: SWIHSItemService,
    private route: ActivatedRoute,
    private router: Router,
    private swiService: SWIFileService
  ) {
  }

  ngOnInit() {
    this.options = this.hsItemsService.getCatalogItems();
    this.route.params.subscribe((params: Params) => {
      if (params['filename']) {
        this.filename = params['filename'];
        this.swiService.getFile(this.filename)
          .then((swi: SWIHeader) => {
            console.log("Init picker", swi);
            this.swi = swi;
            this.title = `SWI Builder - ${this.swi.title} - Edit Health & Safety Items`;
            this.selectedOptions = this.swi.swihsItems;
          });
      }
    });
  }

  onBackButton() {
    this.selectionComplete();
  }

  toggleSelection(item: SWIHSItem) {
    if (this.selectedOptions.filter(i => i.id == item.id).length > 0) {
      console.log(`Removing ID ${item.id}`);
      this.selectedOptions = this.selectedOptions.filter(i => i.id != item.id);
    } else {
      console.log(`Adding ID ${item.id}`);
      this.selectedOptions.push(item);
    }
  }

  isSelected(item: SWIHSItem): boolean {
    return this.selectedOptions.filter(i => i.id == item.id).length > 0;
  }

  selectionComplete() {
    console.log("Selection complete");
    this.swi.swihsItems = this.selectedOptions;
    this.swiService.saveFile(this.swi.filename, this.swi).then(() => {
      this.router.navigate(['swibuilder', this.swi.filename]);
    });
  }
}
