import { Component, OnInit } from '@angular/core';
import { showIndexedDbSize } from "../../core/swi-db.service";
import { RepoDocsService } from "../../../services/repo-docs.service";
import { RepoDocument, RepoCreateDocumentPayload, SimpleRepoDocument, RepoDocumentPartLink } from "app/models/repo.models";
import { SWIHeader } from "app/models/app.models";
import { SWIFileService } from "../../../services/swi-file.service";
import { ImageStoreService } from "../../../services/image-store.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Standard Work Instructions!!';
  docId: number = 1;
  docs: SimpleRepoDocument[];
  swiTest: SWIHeader;
  doc: RepoDocument;
  loading: boolean = false;
  loadingMsg: string;

  partNumber: string;
  revision: string;
  linkPartErrorMessage: string;

  constructor(
    private repoDocs: RepoDocsService,
    private swiService: SWIFileService,
    private imageStore: ImageStoreService
  ) {

  }

  ngOnInit() {
  }

  debugDBSize() {
    showIndexedDbSize();
  }

  async getDocument() {
    this.loading = true;
    this.loadingMsg = "Downloading document from SWI Repository...";

    let doc = await this.repoDocs.getDocument(this.docId);

    this.doc = doc;
    this.loadingMsg = "Extracting SWI...";
    this.swiTest = this.handleRawSWI(this.doc.file.data);
    this.loading = false;
  }

  async getDocuments() {
    this.docs = await this.repoDocs.getDocuments();
  }

  async createDocument() {

    let createDoc: RepoCreateDocumentPayload = new RepoCreateDocumentPayload();
    createDoc.userId = 1;
    createDoc.documentTypeId = 1;
    createDoc.name = "Test from the builder App";
    createDoc.appVersion = "0.7.1";
    createDoc.swiFile = "";

    let doc = await this.repoDocs.createDocument(createDoc);
    this.doc = doc;
    this.docId = doc.id;

    console.log("Created this doc:", doc);
    this.getDocuments();
  }

  handleRawSWI(rawSWI: string): SWIHeader {
    try {
      var start = Date.now();
      let swi: SWIHeader;
      swi = JSON.parse(JSON.parse(rawSWI));
      console.log('Took', Date.now() - start, 'ms');
      return swi;
    } catch (error) {
      console.log("File data is not a valid SWI");
    }
  }

  async attatchFile() {
    //Get an swi from the store
    let swis = await this.swiService.getAll();
    let swi = swis[0];
    swi = await this.imageStore.emmbedImagesIntoSWI(swi);
    this.doc = await this.repoDocs.attatchFile(this.docId, JSON.stringify(swi));
    this.parseFile();
  }

  async linkPart() {
    let linkPart: RepoDocumentPartLink = new RepoDocumentPartLink();
    linkPart.partNumber = this.partNumber;
    linkPart.revision = this.revision;
    linkPart.erpSystemId = 1;

    let partLink = await this.repoDocs.linkPart(this.docId, linkPart);
    this.doc.documentPartLinks.push(partLink);
  }

  parseFile() {
    console.log("Starting parse");
    this.handleRawSWI(this.doc.file.data);
    // let obj: SWIHeader = JSON.parse(this.doc.fileData);
    // // console.log(obj);
    // this.swiTest = obj;
  }


}
