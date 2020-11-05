import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentsComponent } from './add-agents.component';

describe('AddAgentsComponent', () => {
  let component: AddAgentsComponent;
  let fixture: ComponentFixture<AddAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
