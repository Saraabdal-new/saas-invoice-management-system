const clientsService = require('./clients.service');

// Get all clients for current user
exports.getClients = async (req, res, next) => {
  try {
    const clients = await clientsService.getClients(req.user.id);
    res.status(200).json({ data: clients });
  } catch (err) {
    next(err);
  }
};

// Get single client
exports.getClientById = async (req, res, next) => {
  try {
    const client = await clientsService.getClientById(
      req.params.id,
      req.user.id
    );

    if (!client) return res.sendStatus(404);

    res.status(200).json({ data: client });
  } catch (err) {
    next(err);
  }
};

// Create client
exports.createClient = async (req, res, next) => {
  try {
    const client = await clientsService.createClient(
      req.user.id,
      req.body
    );

    res.status(201).json({ data: client });
  } catch (err) {
    next(err);
  }
};

// Update client
exports.updateClient = async (req, res, next) => {
  try {
    const client = await clientsService.updateClient(
      req.params.id,
      req.user.id,
      req.body
    );

    if (!client) return res.sendStatus(404);

    res.status(200).json({ data: client });
  } catch (err) {
    next(err);
  }
};

// Soft delete client
exports.deleteClient = async (req, res, next) => {
  try {
    const deleted = await clientsService.deleteClient(
      req.params.id,
      req.user.id
    );

    if (!deleted) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
