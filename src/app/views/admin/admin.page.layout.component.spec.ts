import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin.Page.LayoutComponent } from './admin.page.layout.component';

describe('Admin.Page.LayoutComponent', () => {
  let component: Admin.Page.LayoutComponent;
  let fixture: ComponentFixture<Admin.Page.LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin.Page.LayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin.Page.LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
