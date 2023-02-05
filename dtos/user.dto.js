module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.user_id = model.user_id
        this.name = model.name
        this.lastName = model.lastName
        this.email = model.email;
        this.avatar = model.avatar
        this.tarif_id = model.tarif_id
        //this.isActivated = model.isActivated;
    }
}
