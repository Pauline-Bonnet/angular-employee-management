import { projectsListMock } from './helpers/projects.helper';
import { Project } from './project';
import { employeesListMock } from './helpers/employees.helper';
import { TestBed } from '@angular/core/testing';
import { EmployeesManagementService } from './employees-management.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Router, ActivatedRoute } from '@angular/router';

let expectedEmployees: Employee[];
let expectedProjects: Project[];

describe('EmployeesManagementService', () => {
  let service: EmployeesManagementService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [EmployeesManagementService]
    });
    
    service = TestBed.inject(EmployeesManagementService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router); 
    route = TestBed.inject(ActivatedRoute);

    expectedEmployees = employeesListMock;
    expectedProjects = projectsListMock;

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all employees after only one call', () => {
    service.getEmployees().subscribe(
      employees => expect(employees).toEqual(expectedEmployees, 'should return expected employees'),
      fail
    );

    const req = httpTestingController.expectOne(service.employeesUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedEmployees);
  });

  it('should return expected employees list when called several times', () => {
    service.getEmployees().subscribe();
    service.getEmployees().subscribe(
      employees => expect(employees).toEqual(employeesListMock, 'should return employees list'),
      fail
    );

    const requests = httpTestingController.match(service.employeesUrl);
    expect(requests.length).toEqual(2, 'calls to the getEmployees() method');

    requests[0].flush([]);
    requests[1].flush(employeesListMock);
  });

  it('should return a single employee', () => {
    service.getEmployee(employeesListMock[0].id).subscribe(
      response => expect(response).toEqual(employeesListMock[0]),
      fail
    );

    const req = httpTestingController.expectOne(`http://localhost:3000/employees/${employeesListMock[0].id}`);
    expect(req.request.method).toEqual('GET');

    req.flush(employeesListMock[0]);
  });

  it('should return all projects after only one call', () => {
    service.getProjects().subscribe(
      projects => expect(projects).toEqual(expectedProjects, 'should return expected projects'),
      fail
    );

    const req = httpTestingController.expectOne(service.projectsUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedProjects);
  });

  it('should return expected projects list when called several times', () => {
    service.getProjects().subscribe();
    service.getProjects().subscribe(
      employees => expect(employees).toEqual(projectsListMock, 'should return projects list'),
      fail
    );

    const requests = httpTestingController.match(service.projectsUrl);
    expect(requests.length).toEqual(2, 'calls to the getProjects() method');

    requests[0].flush([]);
    requests[1].flush(projectsListMock);
  });

  it('should return the length of teams in employees list', () => {
    expect(service.getTeamsLength(employeesListMock)).toEqual(2);
  })

  it('should return the best employee', () => {
    expect(service.getBestEmployee(employeesListMock)).toBe('Rebelle 2');
  });

  it('should return the newest employee', () => {
    expect(service.getNewbe(employeesListMock)).toBe('Rebelle 3');
  });
});


