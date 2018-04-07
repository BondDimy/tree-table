import { TestBed, inject } from '@angular/core/testing';

import { TreeOneNodeServiceService } from './tree-one-node-service.service';

describe('TreeOneNodeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeOneNodeServiceService]
    });
  });

  it('should be created', inject([TreeOneNodeServiceService], (service: TreeOneNodeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
