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

    interface IProcedure {
        name: string;
        description?: string;

        /**
         * corresponds to the healthcare provider category_labels, used for filtering
         */
        category_label: string;

        /**
         * i.e. 'day', 'month', 'year'
         */
        interval: string;

        /**
         * The number of intervals (specified in the interval property) between each procedure. For example, 
         * interval=month and interval_count=3 means every 3 months.
         */
        interval_count: number;
    }

    interface IUser {
        dob: Date;
        insurance: string;
        gender: string;
        conditions?: Array<ICondition>;
        medications?: Array<string>;
    }

    interface ICondition {

    }
}
