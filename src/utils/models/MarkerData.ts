export interface IParty {
  _id?: string;
  uid?: string;
  img?: string;
  title: string;
  description?: string;
  members?: { name: string; id: string }[];
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
