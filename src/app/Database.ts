import Dexie from "dexie";
import {IReference} from "./Reference";

class AppDatabase extends Dexie {
  references: Dexie.Table<IReference, number>;

  constructor() {
    super("AppDatabase");

    this.version(1).stores(
      {
        references: 'id, apaRef, bibtexRef, title, year, firstAuthor, numPage, status, printed, pdfLink, conference, goalDescr, studyDescr, studySetupDescr, studyParticipantsDescr, studyMetricsDescr, studyCaseDescr, findDescr, theoryDescr, keywords'
      }
    );

    this.references = this.table("references")
  }
}

export var db = new AppDatabase();
