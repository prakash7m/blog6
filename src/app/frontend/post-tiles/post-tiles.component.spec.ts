import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTilesComponent } from './post-tiles.component';

describe('PostTilesComponent', () => {
  let component: PostTilesComponent;
  let fixture: ComponentFixture<PostTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
