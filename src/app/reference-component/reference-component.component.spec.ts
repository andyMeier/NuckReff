import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceComponentComponent } from './reference-component.component';

describe('ReferenceComponentComponent', () => {
  let component: ReferenceComponentComponent;
  let fixture: ComponentFixture<ReferenceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
