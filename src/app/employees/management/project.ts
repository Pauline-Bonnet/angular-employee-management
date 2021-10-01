export interface ProjectIO {
    id: number;
    name: string;
    repo: string;
}

export class Project {
    id: number;
    name: string;
    repo: string;

    constructor(props: Partial<ProjectIO>) {
        this.id = props.id ?? 0;
        this.name = props.name ?? '';
        this.repo = props.repo ?? '';
    }
}