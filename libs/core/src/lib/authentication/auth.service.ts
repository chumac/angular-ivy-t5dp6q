import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { AdalService } from 'adal-angular4/adal.service';

import * as constants from '@nutela/shared/app-global';
import { IApiResult } from '@nutela/models/core-data';
import { ApiService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ISecurityRole } from '@nutela/models/common';
import { getSecurityRole, getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public returnUrl = '';
  authorized = false;
  permitted = true;
  admin = true;
  cannotReboard = true;

  comprehensiveData$: Observable<IComprehensiveData>;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private adalService: AdalService,
    private store: Store<IAppState>
  ) { }

  verifyToken(): Observable<IApiResult> {
    return this.apiService.read(`${constants.AUTH_URL.verifyToken}`)
  }

  licenseCheck(): Observable<IApiResult> {
    return this.apiService.read(`${constants.AUTH_URL.licenseCheck}`)
  }

  isAuthenticated(): boolean {
    return this.adalService.userInfo.authenticated;
  }

  isAuthorized(): boolean {
    return this.isAuthenticated() && this.authorized;
  }

  isPermitted(): boolean {
    return this.isAuthorized() && this.permitted;
  }

  isAdmin(): boolean {
    return this.isAuthorized() && this.admin;
  }


  userCannotReboard(): boolean {
    return this.isAuthorized() && this.cannotReboard;
  }

  rolePermission(role: string): Observable<ISecurityRole> {
    return this.store.pipe(select(getSecurityRole(role)));
  }

  init(configOptions: any) {
    this.adalService.init(configOptions);
  }

  handleWindowCallback(): void {
    this.adalService.handleWindowCallback();
  }

  heartBeat(): Observable<IApiResult> {
    return this.apiService.read(`${constants.AUTH_URL.heartBeat}`)
  }

  getExitInitiationStatus(): Observable<IApiResult> {
    return this.apiService.read(`${constants.INITIATION_STATUS.get}`)
  }

  signin(): void {
    this.adalService.login();
  }

  signout(): void {
    this.clear();
    this.adalService.logOut();
  }

  logOut(): void {
    this.authorized = false;
    this.permitted = false;
    this.adalService.logOut();
  }

  clear() {
    this.returnUrl = '';
    this.authorized = false;
    this.permitted = false;
  }

  getAppModuleToSecurityRoleMap(): Map<string, string> {
    let map = new Map<string, string>();

    map.set(constants.WORKFORCE_MODULES.EMPLOYEE_PROFILES, constants.SECURITY_ROLES.hrAdministration);
    map.set(constants.WORKFORCE_MODULES.EXIT_MANAGEMENT, constants.SECURITY_ROLES.hrAdministration);
    map.set(constants.WORKFORCE_MODULES.PROCESSES, constants.SECURITY_ROLES.hrCustomProcess);
    map.set(constants.PLATFORM_MODULES.DATA_ADMINISTRATION, constants.SECURITY_ROLES.hrDataAdministration);
    map.set(constants.ENTERPRISE_PLANNING_MODULES.ENTERPRISE_STRUCTURE, constants.SECURITY_ROLES.hrEnterprise);
    map.set(constants.PLATFORM_MODULES.HR_FOUNDATIONS, constants.SECURITY_ROLES.hrFoundations);

    map.set(constants.WORKFORCE_MODULES.ABSENCE, constants.SECURITY_ROLES.hrLeave);
    map.set(constants.COMPENSATION_MODULES.LOANS, constants.SECURITY_ROLES.hrLoans);
    map.set(constants.COMPENSATION_MODULES.PAYMENTS, constants.SECURITY_ROLES.hrPayments);
    map.set(constants.TALENT_MODULES.PERFORMANCE, constants.SECURITY_ROLES.hrMeasure);
    map.set(constants.TALENT_MODULES.LEARNING, constants.SECURITY_ROLES.hrMeasure);
    map.set(constants.PLATFORM_MODULES.PROVISIONING, constants.SECURITY_ROLES.hrProvisioning);
    map.set(constants.COMPENSATION_MODULES.PAYROLL, constants.SECURITY_ROLES.hrPayroll);

    return map;
  }
}

