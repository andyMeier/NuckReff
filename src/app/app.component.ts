import {Component, OnInit} from '@angular/core';
import {IReference, Reference} from './Reference';
import * as FileSaver from "file-saver";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {db} from "./Database";

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(private http: HttpClient) {
    this.http = http
  }

  updateIfPresent = false;
  resetDB = false;
  file: any;
  name: string = "";
  result: any;
  loadResult: boolean = false;
  indexAll: Array<number> = [];
  references: Array<IReference> = [];
  newReference = new Reference (-1, '', '', '', 1900, '', 0, 'rainyDay', 0, '', '', '', '', '', '', '', '', '', '', []);



  fileChanged(e) {
    this.file = e.target.files[0];
  }

  fileSave() {
    db.references.toArray().then(res => {
      let outputStrAr = [];
      let notInDbReferences: Array<IReference> = this.references.filter(q => res.filter(q1 => q1.id == q.id).length == 0);
      let allRs = res.concat(notInDbReferences).map(refs => Reference.stringify(<Reference>refs));
      const blob = new Blob(allRs, {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "NuckReffFile_" + new Date().toLocaleString() + ".txt");
    }, err => {
      throw err;
    });
  }

  ngOnInit(): void {

  }

  loadDocumentFromFile(filename: string) {
    return this.http.get(filename, {
      responseType: 'text', headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }).pipe(map(data => {
      return data.split("\n");
    }));
  }

  uploadDocument(startAtPrevIndex = false) {
    this.loadResult = true;
    if (this.resetDB) db.references.clear();
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.result = fileReader.result;
      this.processResult(this.result);
      this.loadResult = false;
      this.copyFromDBToArray ();
    };
    fileReader.readAsText(this.file);
  }

  uploadEmpty () {
    if (this.resetDB) db.references.clear();
    this.result = "";
      this.copyFromDBToArray ();
  }

  copyFromDBToArray () {
    // get the references that are in the db but not in the array to be added to the array for display on interface
    db.references.toArray().then(res => {
      res.forEach(element => {
        if (!this.indexAll.includes(element.id)) {
          this.references.push(element);
          this.indexAll.push(element.id)
        }
      });
    }, err => {
      throw err;
    });
  }

  searchArrayForSubstring(subs: string, arr: Array<string>) {
    let outp = [];
    arr.forEach(element => {
      if (element.toLowerCase().search(subs.toLowerCase()) != -1) {
        outp.push(element);
      }
    });
    return outp;
  }

  getAllIndices(arr, val) {
    let indices = [];
    for(let i = 0; i < arr.length; i++) {
      if (arr[i][0] === val) indices.push(i);
    }
    return indices;
  }


  processResult(result: string, startAtPrevIndex = false) {
    console.log('start processing file input');
    const lines = result.split('\n').map(line => {
      return line.split('$$$');
    });

    lines.filter(line => (line.length == 20) ).forEach(line => {
      let ind = 0;
      const id: number = +line[ind];
      const apaRef: string = line[++ind];
      const bibtexRef: string = line[++ind];
      const title: string = line[++ind];
      const year: number = +line[++ind];
      const firstAuthor: string = line[++ind];
      const numPage: number = +line[++ind];
      const status: string = line[++ind];
      const printed: number = +line[++ind];
      const pdfLink: string = line[++ind];
      const conference: string = line[++ind];
      const goalDescr: string = line[++ind];
      const studyDescr: string = line[++ind];
      const studySetupDescr: string = line[++ind];
      const studyParticipantsDescr: string = line[++ind];
      const studyMetricsDescr: string = line[++ind];
      const studyCaseDescr: string = line[++ind];
      const findDescr: string = line[++ind];
      const theoryDescr: string = line[++ind];
      const keywords: Array<string> = line[++ind].split(';');

      const currReference = new Reference(id, apaRef, bibtexRef, title, year, firstAuthor, numPage, status, printed, pdfLink, conference, goalDescr, studyDescr, studySetupDescr, studyParticipantsDescr, studyMetricsDescr, studyCaseDescr, findDescr, theoryDescr, keywords);
      this.references.push(currReference); // add to array
      this.indexAll.push(id); // add id to list of ids
      this.refDB_AddUpdate(currReference); // add to db

    });
    console.log("done")
  }

  addNewReference () {
    let nextIndex: number = -1;
    for (let i = 0; i < this.indexAll.length+1; i += 1) {
      if (this.indexAll.includes(i)) {
        nextIndex = i;
      }
    }
    if (nextIndex >= 0) {
      this.newReference.id = nextIndex;
      this.references.push(this.newReference);
      this.indexAll.push(nextIndex);
    }
    this.newReference = new Reference (-1, '', '', '', 1900, '', 0, 'rainyDay', 0, '', '', '', '', '', '', '', '', '', '', []);
  }

  refDB_AddUpdate(refElem: Reference, update = true) {

    let k = db.references.get(refElem.id).then(res => {
      if (!res) {
        db.references.put(refElem).then(r => {
          console.log("put element in db ", refElem.id)
        });
      } else {
        db.references.update(refElem.id, refElem).then(
          () => {
            console.log('updated question', refElem.id);
          },
          error => {
            console.log('error when updating existing reference', error);
          });
      }
    });

  }

  exportData () {
    this.fileSave ();
  }

}
