import { Employee } from '../employee';

export const employeesListMock: Employee[] = [    
  {
    id: 1,
    birthDate: "1991-11-07",
    email: "leanne.graham@johns-group.com",
    name: "Rebelle 1",
    position: "FullStack Developer",
    projects: [1, 2],
    recrutementDate: "2017-06-15",
    sex: "female",
    score: 78,
    team: "A"
  },
  {
    id: 2,
    birthDate: "1993-04-13",
    email: "andrea.skiles@johns-group.com",
    name: "Rebelle 2",
    position: "DevOps Engineer",
    projects: [5, 6],
    recrutementDate: "2015-02-01",
    sex: "female",
    score: 82,
    team: "D"
  },
  {
    id: 3,
    birthDate: "1994-02-11",
    email: "nicholas.runolfsdottir@johns-group.com",
    name: "Rebelle 3",
    projects: [7],
    position: "FrontEnd Developer",
    recrutementDate: "2021-01-01",
    sex: "male",
    score: 23,
    team: "A"
  }
];

export const employeesToFilter: Employee[] = [    
  {
    id: 1,
    birthDate: "1991-11-07",
    email: "leanne.graham@johns-group.com",
    name: "Luke",
    position: "FullStack Developer",
    projects: [1, 2],
    recrutementDate: "2017-06-15",
    sex: "female",
    score: 78,
    team: "A"
  },
  {
    id: 2,
    birthDate: "1993-04-13",
    email: "andrea.skiles@johns-group.com",
    name: "Leia",
    position: "DevOps Engineer",
    projects: [5, 6],
    recrutementDate: "2015-02-01",
    sex: "female",
    score: 82,
    team: "D"
  },
  {
    id: 3,
    birthDate: "1994-02-11",
    email: "nicholas.runolfsdottir@johns-group.com",
    name: "Han",
    projects: [7],
    position: "FrontEnd Developer",
    recrutementDate: "2021-01-01",
    sex: "male",
    score: 23,
    team: "C"
  }
];

export const rebelMock: Employee = {
  id: 1,
  birthDate: "1997-02-19",
  email: "rebel@gmail.com",
  name: "Fifoo",
  position: "Frontend Engineer",
  projects: [5, 6],
  recrutementDate: "2015-02-01",
  sex: "female",
  score: 82,
  team: "A"
};