import { Component, OnInit } from "@angular/core";
import {
  SimpleRepoDocument,
  SWIHeader,
  RepoDocument,
  RepoDocsService,
  SWIFileService,
  ImageStoreService,
  showIndexedDbSize,
  RepoCreateDocumentPayload,
  RepoDocumentPartLink,
  AuthService
} from "app/core";

@Component({
  selector: "swi-app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  title = "Standard Work Instructions!!";
  docId = 1;
  docs: SimpleRepoDocument[];
  swiTest: SWIHeader;
  doc: RepoDocument;
  loading = false;
  loadingMsg: string;
  username: string;
  password: string;

  partNumber: string;
  revision: string;
  linkPartErrorMessage: string;

  constructor(
    private repoDocs: RepoDocsService,
    private swiService: SWIFileService,
    private imageStore: ImageStoreService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
  }

  debugDBSize() {
    showIndexedDbSize();
  }

  async login() {
    let token: string;
    try {
      token = await this.authService.login(this.username, this.password).toPromise();
      console.log("Login succesful");
    } catch (error) {
      console.log("Could not log in", error.json().message);
    }
  }

  async getDocument() {
    this.loading = true;
    this.loadingMsg = "Downloading document from SWI Repository...";

    const doc = await this.repoDocs.getDocument(this.docId);

    this.doc = doc;
    this.loadingMsg = "Extracting SWI...";
    this.swiTest = this.handleRawSWI(this.doc.file.data);
    this.loading = false;
  }

  async getDocuments() {
    this.docs = await this.repoDocs.getDocuments();
  }

  async createDocument() {

    const createDoc = new RepoCreateDocumentPayload();
    createDoc.userId = 1;
    createDoc.documentTypeId = 1;
    createDoc.name = "Test from the builder App";
    createDoc.appVersion = "0.7.1";
    createDoc.swiFile = "";

    const doc = await this.repoDocs.createDocument(createDoc);
    this.doc = doc;
    this.docId = doc.id;

    console.log("Created this doc:", doc);
    this.getDocuments();
  }

  handleRawSWI(rawSWI: string): SWIHeader {
    try {
      const start = Date.now();
      let swi: SWIHeader;
      swi = JSON.parse(JSON.parse(rawSWI));
      console.log("Took", Date.now() - start, "ms");
      return swi;
    } catch (error) {
      console.log("File data is not a valid SWI");
    }
  }

  async attatchFile() {
    // Get an swi from the store
    const swis = await this.swiService.getAll();
    let swi = swis[0];
    swi = await this.imageStore.emmbedImagesIntoSWI(swi);
    this.doc = await this.repoDocs.attatchFile(this.docId, JSON.stringify(swi));
    this.parseFile();
  }

  async linkPart() {
    const linkPart = new RepoDocumentPartLink();
    linkPart.partNumber = this.partNumber;
    linkPart.revision = this.revision;
    linkPart.erpSystemId = 1;

    const partLink = await this.repoDocs.linkPart(this.docId, linkPart);
    this.doc.documentPartLinks.push(partLink);
  }

  parseFile() {
    console.log("Starting parse");
    this.handleRawSWI(this.doc.file.data);
  }
}
