export interface IParty {
  id?: string;
  uid?: string;
  img?: string;
  title: string;
  description?: string;
  members?: string[];
  geoPoint: number[];
  isActive: boolean;
  createdAt: Date;
  endDate: Date | string;
  timeSlots: { start: Date | string; end: Date | string }[];
  maxMembers: number;
  membersCount: number;
  tags: string[];
  isPaid: boolean;
  author?: string;
}

export interface Marker {
  data: IParty;
}
