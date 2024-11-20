const ListedCycle = require('../model/ListedCycle')

const addListedCycle =  async (req, res) => {
    const { cycleid, ownerid, name, pickup, drop, cost } = req.body;

    try {
        const newCycle = new ListedCycle({
            cycleid,
            ownerid,
            name,
            pickup,
            drop,
            cost,
            total: 0, 
            count: 0 
        });

        const savedCycle = await newCycle.save();
        res.status(201).json({ message: 'Cycle listed successfully', cycle: savedCycle });
    } catch (error) {
        console.error('Error creating cycle:', error);
        res.status(500).json({ error: 'Failed to create the listed cycle' });
    }
};

const getListedCycle =  async (req, res) => {
    const { ownerid } = req.params;

    try {
        const cycles = await ListedCycle.find({ ownerid });
        if (cycles.length === 0) {
            return res.status(404).json({ message: 'No cycles found for this owner' });
        }

        res.status(200).json({ cycles });
    } catch (error) {
        console.error('Error retrieving cycles:', error);
        res.status(500).json({ error: 'Failed to retrieve cycles' });
    }
};

const getListedCyclebyId =  async (req, res) => {
    const { cycleid } = req.params;

    try {
        const cycles = await ListedCycle.find({ cycleid });
        if (cycles.length === 0) {
            return res.status(404).json({ message: 'No cycles found for this id' });
        }

        res.status(200).json({ cycles });
    } catch (error) {
        console.error('Error retrieving cycles:', error);
        res.status(500).json({ error: 'Failed to retrieve cycles' });
    }
};

module.exports = { addListedCycle, getListedCycle, getListedCyclebyId };


