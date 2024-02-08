import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPlaylistsDetailsComponent } from './public-playlists-details.component';

describe('PublicPlaylistsDetailsComponent', () => {
  let component: PublicPlaylistsDetailsComponent;
  let fixture: ComponentFixture<PublicPlaylistsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPlaylistsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicPlaylistsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
