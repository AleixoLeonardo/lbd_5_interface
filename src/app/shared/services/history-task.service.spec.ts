import { TestBed } from '@angular/core/testing';

import { HistoryTaskService } from './history-task.service';

describe('HistoryTaskService', () => {
  let service: HistoryTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
