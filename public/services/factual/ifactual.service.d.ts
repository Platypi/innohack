declare module config {
    interface IFilter {
        factual_id?: string;
        latitude?: number;
        longitude?: number;
        meters?: number;
        insurances?: Array<string>;
        category_labels?: Array<string>;
        KEY?: string;
    }
}
