const SERVER = require('../utils/leancloud-storage');

class Drivers extends SERVER.Object {

    get objectId(){
        return this.get('objectId');
    }

    get name() {
        return this.get('name');
    }
    set name(value) {
        this.set('name', value);
    }

    get goAddr() {
        return this.get('goAddr');
    }
    set goAddr(value) {
        this.set('goAddr', value);
    }

    get arrAddr() {
        return this.get('arrAddr');
    }
    set arrAddr(value) {
        this.set('arrAddr', value);
    }

    get seatNum() {
        return this.get('seatNum');
    }
    set seatNum(value) {
        this.set('seatNum', value);
    }
    get goTime() {
        return this.get('goTime');
    }
    set goTime(value) {
        this.set('goTime', value);
    }
    get phone() {
        return this.get('phone');
    }
    set phone(value) {
        this.set('phone', value);
    }
    get carNum() {
        return this.get('carNum');
    }
    set carNum(value) {
        this.set('carNum', value);
    }
    get carColor() {
        return this.get('carColor');
    }
    set carColor(value) {
        this.set('carColor', value);
    }
    get carType() {
        return this.get('carType');
    }
    set carType(value) {
        this.set('carType', value);
    }
    get imageUrl() {
        return this.get('imageUrl');
    }
    set imageUrl(value) {
        this.set('imageUrl', value);
    }
    get date() {
        return this.get('date');
    }
    set date(value) {
        this.set('date', value);
    }

}

SERVER.Object.register(Drivers, 'Drivers');
module.exports = Drivers;