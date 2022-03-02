export default class Client {
    constructor(firstName, lastName, maxes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.maxes = maxes;
        this.fullName = [firstName, lastName].join(' ');
    }
}