export interface EmployeeIO {
    id: number;
    birthDate: string;
    email: string;
    name: string;
    position: string;
    projects: number[];
    recrutementDate: string;
    sex: string;
    score: number;
    team: string;
}

export class Employee {
    id: number;
    birthDate: string;
    email: string;
    name: string;
    position: string;
    projects: number[];
    recrutementDate: string;
    sex: string;
    score: number;
    team: string;

    constructor(props: Partial<EmployeeIO>) {
        this.id = props.id ?? 0;
        this.birthDate = props.birthDate ?? 'Inconnue';
        this.email = props.email ?? '';
        this.name = props.name ?? 'Soldat inconnu';
        this.position = props.position ?? 'Mort au combat';
        this.projects = props.projects ?? [];
        this.recrutementDate = props.recrutementDate ?? 'Inconnue';
        this.sex = props.sex ?? 'Inconnu';
        this.score = props.score ?? 0;
        this.team = props.team ?? 'A déterminer';
    }
}