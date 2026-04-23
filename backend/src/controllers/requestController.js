const Request = require('../models/Request');
const Listing = require('../models/Listing');
const Notification = require('../models/Notification');

exports.createRequest = async (req, res) => {
  const listing = await Listing.findById(req.body.listingId);
  if (!listing) return res.status(404).json({ error: 'Listing not found.' });
  if (String(listing.owner) === String(req.user._id)) return res.status(400).json({ error: 'You cannot request your own listing.' });

  const request = await Request.create({
    listing: listing._id,
    requester: req.user._id,
    owner: listing.owner,
    note: req.body.note || ''
  });

  listing.requestCount += 1;
  await listing.save();

  await Notification.create({
    user: listing.owner,
    type: 'request',
    text: `${req.user.firstName} requested your listing: ${listing.title}`,
    meta: { listingId: listing._id, requestId: request._id }
  });

  res.status(201).json({ request });
};

exports.listMyRequests = async (req, res) => {
  const requests = await Request.find({ $or: [{ requester: req.user._id }, { owner: req.user._id }] })
    .populate('listing', 'title images status location')
    .populate('requester', 'firstName lastName')
    .populate('owner', 'firstName lastName')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ requests });
};

exports.updateRequestStatus = async (req, res) => {
  const request = await Request.findById(req.params.id).populate('listing');
  if (!request) return res.status(404).json({ error: 'Request not found.' });
  if (String(request.owner) !== String(req.user._id)) return res.status(403).json({ error: 'Only the owner can update request status.' });

  request.status = req.body.status;
  await request.save();

  await Notification.create({
    user: request.requester,
    type: 'request',
    text: `Your request for ${request.listing.title} is now ${request.status}.`,
    meta: { listingId: request.listing._id, requestId: request._id }
  });

  res.json({ request });
};
