import { Item } from "./item";

export class Release {
    description:string;
    estimationDate: Date;
    id:string;
    name:string;
    value: number;
    projectId: string;
    status:string;
    children:Item[]
}
