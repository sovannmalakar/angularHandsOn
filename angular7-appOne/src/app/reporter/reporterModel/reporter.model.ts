export class Reporter {
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    country: string;
    latitude
    longitude
    companyName: string;
    zip: string;

    constructor(firstName, lastName, city, state, country, latitude, longitude, companyName, zip)
    {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.state = state;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.companyName = companyName;
    this.zip = zip;
    }
}
