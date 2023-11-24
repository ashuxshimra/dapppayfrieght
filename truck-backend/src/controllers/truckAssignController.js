const { TruckAssign } = require('../models/TruckAssign');
// const LoadService = require('../services/loadsService');
const { Load } = require('../models/Load');

class TruckAssignController {
    async assignTruck(req, res) {
      try {
        const { userId, loadId, truckNum } = req.body;
        
        // const truckAssign = new TruckAssign({
        //   created_by: userId,
        //   loadBy: loadId,
        //   assigned_to: truckNum
        // });
        // await truckAssign.save()
        //   .then(async () => {
            await Load.findOneAndUpdate({
              _id: loadId,
            }, {status: 'ASSIGNED',assigned_to: userId, truckNum, });
            res.json({ message: 'Load assigned successfully' })
          // })
          // .catch((err) => res.status(400).json({ message: err.message }));
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    }
}

module.exports = new TruckAssignController();
