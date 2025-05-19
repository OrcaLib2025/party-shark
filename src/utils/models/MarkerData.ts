export interface IParty {
    id?: string;
    img?: string;
    title?: string;
    description?: string;
    members?: string[];
    geoPoint?: number[];
    isActive?: boolean;
    createdAt?: Date;
    endDate?: Date;
    timeSlots?: {
        start: Date;
        end: Date;
    }[];
    maxMembers?: number;
    membersCount?: number;
    tags?: string[];
    isPaid?: boolean;
    author?: string;
}

export interface Marker {
    data: IParty;
}
