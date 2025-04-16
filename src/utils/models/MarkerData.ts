export interface MarkerData {
    id: number;
    coordinates: [number, number];
    title: string;
    description: string;
    photo?: string;
    author: string;
    date: string;
}

export interface Marker {
    data: MarkerData;
}