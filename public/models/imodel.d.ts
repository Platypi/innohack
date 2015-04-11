declare module models {
    interface IHealthcareProvider {
        factual_id: string;
        address: string;
        address_extended: string;
        category_labels: Array<Array<string>>;
        country: string;
        degrees: Array<string>;
        gender: string;
        hours: IDailyHours;
        hours_display: string;
        insurances: Array<string>;
        languages: Array<string>;
        latitude: number;
        longitude: number;
        locality: string;
        name: string;
        neighborhood: string;
        postcode: string;
        region: string;
        tel: string;
        tel_normalized: string;
        website: string;
    }

    interface IDailyHours {
        monday: Array<IHour>;
        tuesday: Array<IHour>;
        wednesday: Array<IHour>;
        thursday: Array<IHour>;
        friday: Array<IHour>;
    }

    interface IHour extends Array<[string, string]> { }

    interface IUser {
        dob: Date;
        insurance: string;
        gender: string;
        conditions: Array<ICondition>;
    }

    interface ICondition {

    }
}
