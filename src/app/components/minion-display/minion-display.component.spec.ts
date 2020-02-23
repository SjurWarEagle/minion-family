import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinionDisplayComponent } from './minion-display.component';

describe('MinionDisplayComponent', () => {
  let component: MinionDisplayComponent;
  let fixture: ComponentFixture<MinionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MinionDisplayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
