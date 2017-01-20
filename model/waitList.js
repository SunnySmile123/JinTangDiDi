const SERVER = require('../utils/leancloud-storage');

class WaitList extends SERVER.Object {
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

SERVER.Object.register(WaitList, 'WaitList');
module.exports = WaitList;