const { Schema, model } = require('mongoose');

class MongoActionSystemDecision extends Schema {
  constructor() {
    super(
      {
        actions: Array,
        analyzes: Object,
      },
      { timestamps: true }
    );
  }
}

export default model('Analyze', new MongoActionSystemDecision());
