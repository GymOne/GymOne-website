import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegComponent } from './log-reg.component';

describe('LogRegComponent', () => {
  let component: LogRegComponent;
  let fixture: ComponentFixture<LogRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
