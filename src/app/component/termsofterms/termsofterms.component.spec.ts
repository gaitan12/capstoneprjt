import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsoftermsComponent } from './termsofterms.component';

describe('TermsoftermsComponent', () => {
  let component: TermsoftermsComponent;
  let fixture: ComponentFixture<TermsoftermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsoftermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsoftermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
