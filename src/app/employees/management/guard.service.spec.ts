import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { GuardService } from './guard.service';
import { ActivatedRouteSnapshot, Data, Router, UrlTree } from '@angular/router';

class SnapshotStub {
  private _data!: Data;

  set data(obj: Data) {
    this._data = obj;
  }

  get data() {
    return this._data;
  }
}

describe('GuardService', () => {
  let service: GuardService;
  let snapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: ActivatedRouteSnapshot, useClass: SnapshotStub}]
    });
    service = TestBed.inject(GuardService);
    snapshot = TestBed.inject(ActivatedRouteSnapshot);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
