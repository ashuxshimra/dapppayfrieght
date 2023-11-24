const mongoose = require('mongoose');

const loadState = [null, 'En route to Pick Up', 'Arrived to Pick Up', 'En route to delivery', 'Arrived to delivery'];
const loadStatus = ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'];

const loadSchema = mongoose.Schema({
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: loadStatus,
    default: loadStatus[0],
    required: true,
  },
  state: {
    type: String,
    enum: loadState,
    default: loadState[0],
  },
  name: {
    type: String,
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: false,
  },
  delieverTill: {
    type: String,
    required: false,
  },
  loadType: {
    type: String,
    required: true,
  },
  
  logs: [],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Load = mongoose.model('Load', loadSchema);

module.exports = {
  Load,
  loadState,
  loadStatus,
};
