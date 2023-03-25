import { TestBed } from '@angular/core/testing';

import { StarWarsClientService } from './star-wars-client.service';

describe('StarWarsClientService', () => {
  let service: StarWarsClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarsClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
