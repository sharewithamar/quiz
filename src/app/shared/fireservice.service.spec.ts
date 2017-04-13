import { TestBed, inject } from '@angular/core/testing';

import { FireserviceService } from './fireservice.service';

describe('FireserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireserviceService]
    });
  });

  it('should ...', inject([FireserviceService], (service: FireserviceService) => {
    expect(service).toBeTruthy();
  }));
});
