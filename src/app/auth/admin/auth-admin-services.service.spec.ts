import { TestBed } from '@angular/core/testing';

import { AuthAdminServicesService } from './auth-admin-services.service';

describe('AuthAdminServicesService', () => {
  let service: AuthAdminServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAdminServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
