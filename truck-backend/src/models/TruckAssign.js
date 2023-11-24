const mongoose = require('mongoose');

// const loadState = [null, 'En route to Pick Up', 'Arrived to Pick Up', 'En route to delivery', 'Arrived to delivery'];
// const loadStatus = ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'];

const truckAssignSchema = mongoose.Schema({
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    default: null,
  },
  loadBy: {
    type: String,
    default: null,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const TruckAssign = mongoose.model('TruckAssign', truckAssignSchema);

module.exports = {
    TruckAssign
};
