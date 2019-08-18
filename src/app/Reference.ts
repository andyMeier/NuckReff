export interface IReference {
  id: number;
  apaRef: string;
  bibtexRef: string;
  title: string;
  year: number;
  firstAuthor: string;
  numPage: number;
  status: string;
  printed: number;
  pdfLink: string;
  conference: string;
  goalDescr: string;
  studyDescr: string;
  studySetupDescr: string;
  studyParticipantsDescr: string;
  studyMetricsDescr: string;
  studyCaseDescr: string;
  findDescr: string;
  theoryDescr: string;
  keywords: Array<string>;
  collapseExtraInfos: number;
}

export class Reference implements IReference {
  id: number;
  apaRef: string;
  bibtexRef: string;
  title: string;
  year: number;
  firstAuthor: string;
  numPage: number;
  status: string;
  printed: number;
  pdfLink: string;
  conference: string;
  goalDescr: string;
  studyDescr: string;
  studySetupDescr: string;
  studyParticipantsDescr: string;
  studyMetricsDescr: string;
  studyCaseDescr: string;
  findDescr: string;
  theoryDescr: string;
  keywords: Array<string>;
  collapseExtraInfos: number;

  constructor(id: number,
              apaRef: string,
              bibtexRef: string,
              title: string,
              year: number,
              firstAuthor: string,
              numPage: number,
              status: string,
              printed: number,
              pdfLink: string,
              conference: string,
              goalDescr: string,
              studyDescr: string,
              studySetupDescr: string,
              studyParticipantsDescr: string,
              studyMetricsDescr: string,
              studyCaseDescr: string,
              findDescr: string,
              theoryDescr: string,
              keywords: Array<string>,
              collapseExtraInfos: number) {
    this.id = id;
    this.apaRef = apaRef;
    this.bibtexRef = bibtexRef;
    this.title = title;
    this.year = year;
    this.firstAuthor = firstAuthor;
    this.numPage = numPage;
    this.status = status;
    this.printed = printed;
    this.pdfLink = pdfLink;
    this.conference = conference;
    this.goalDescr = goalDescr;
    this.studyDescr = studyDescr;
    this.studySetupDescr = studySetupDescr;
    this.studyParticipantsDescr = studyParticipantsDescr;
    this.studyMetricsDescr = studyMetricsDescr;
    this.studyCaseDescr = studyCaseDescr;
    this.findDescr = findDescr;
    this.theoryDescr = theoryDescr;
    this.keywords = keywords;
    this.collapseExtraInfos = collapseExtraInfos;
  }

  clone() {
    return new Reference(this.id, this.apaRef, this.bibtexRef, this.title, this.year, this.firstAuthor, this.numPage,
                        this.status, this.printed, this.pdfLink, this.conference,
                        this.goalDescr, this.studyDescr, this.studySetupDescr,
                        this.studyParticipantsDescr, this.studyMetricsDescr, this.studyCaseDescr,
                        this.findDescr, this.theoryDescr, this.keywords, this.collapseExtraInfos);
  }

  static stringify(obj: Reference, delimiter = '$$$'): string {

    return obj.id.toString() + delimiter +
      obj.apaRef.toString() + delimiter +
      obj.bibtexRef + delimiter +
      obj.title.toString() + delimiter +
      obj.year.toString() + delimiter +
      obj.firstAuthor.toString() + delimiter +
      obj.numPage.toString() + delimiter +
      obj.status.toString() + delimiter +
      obj.printed.toString() + delimiter +
      obj.pdfLink.toString() + delimiter +
      obj.conference.toString() + delimiter +
      obj.goalDescr.toString() + delimiter +
      obj.studyDescr.toString() + delimiter +
      obj.studySetupDescr.toString() + delimiter +
      obj.studyParticipantsDescr.toString() + delimiter +
      obj.studyMetricsDescr.toString() + delimiter +
      obj.studyCaseDescr.toString() + delimiter +
      obj.findDescr.toString() + delimiter +
      obj.theoryDescr.toString() + delimiter +
      Reference.serialise(obj.keywords) + delimiter +
      obj.collapseExtraInfos.toString() + '\n'
  }

  static serialise(ar, delimiter = ';') {
    let s = "";
    if (ar.length > 0) {
      for (let i = 0; i < ar.length - 1; i += 1) {
        s = s + ar[i] + delimiter;
      }
      s = s + ar[ar.length - 1];
    }
    return s
  }

}


