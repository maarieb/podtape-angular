import { TestBed } from '@angular/core/testing';

import { GenrePreferenceService } from './genre-preference.service';

describe('GenrePreferenceService', () => {
  let service: GenrePreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenrePreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
