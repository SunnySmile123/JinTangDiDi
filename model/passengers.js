const AV = require('../utils/leancloud-storage');

class Passengers extends AV.Object {
  get wxid() {
    return this.get('wxid');
  }
  set wxid(value) {
    this.set('wxid', value);
  }

  get phone() {
    return this.get('phone');
  }
  set phone(value) {
    this.set('phone', value);
  }
}

AV.Object.register(Passengers, 'Passengers');
module.exports = Passengers;