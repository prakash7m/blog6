import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsHomeContainerComponent } from './posts-home-container.component';

describe('PostsHomeContainerComponent', () => {
  let component: PostsHomeContainerComponent;
  let fixture: ComponentFixture<PostsHomeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsHomeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
