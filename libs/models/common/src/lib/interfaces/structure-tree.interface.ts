export interface IStructureTree {
    identity: number;
    structure_id: number;
    description: string;
    structure_type: string;
    structure_linked_to: string;
    username: string;
    sourced_from_id: number;
    lineage: string;
    shared_code: string;
    mis_code: string;
    structure_type_id: number;
    back_to: number;
}
