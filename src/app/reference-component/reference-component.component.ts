import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Reference} from '../Reference';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {style} from '@angular/animations';

@Component({
  selector: 'app-reference-component',
  templateUrl: './reference-component.component.html',
  styleUrls: ['./reference-component.component.css']
})
export class ReferenceComponentComponent implements OnChanges {
  @Input() reference: Reference;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges() {

  }
}

