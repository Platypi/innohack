declare module config {
    interface IFilter {
        latitude?: number;
        longitude?: number;
        meters?: number;
        insurances?: Array<string>;
        category_labels?: Array<string>;
        KEY?: string;
    }
}
