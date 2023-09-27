import { Item } from "./item";
import { Collaborator } from "./sector";

export interface Movement {
    id: string,
    date: string,
    item: Item,
    byCollaborator: Collaborator,
    toCollaborator: Collaborator,
    changedBy: {
        name: string,
        email: string,
    }
}
