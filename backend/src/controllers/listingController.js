const Listing = require('../models/Listing');

exports.listListings = async (req, res) => {
  const { q = '', category = '', owner = '', status = 'active' } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;
  if (owner === 'me') filter.owner = req.user?._id;
  if (status && status !== 'all') filter.status = status;

  const listings = await Listing.find(filter)
    .populate('owner', 'firstName lastName city region avatarUrl')
    .sort({ createdAt: -1 })
    .lean();

  res.json({ listings });
};

exports.getListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('owner', 'firstName lastName city region avatarUrl').lean();
  if (!listing) return res.status(404).json({ error: 'Listing not found.' });
  res.json({ listing });
};

exports.createListing = async (req, res) => {
  const imageFiles = req.files || [];
  const images = imageFiles.map(file => ({ url: `/uploads/${file.filename}`, filename: file.filename }));
  const listing = await Listing.create({
    owner: req.user._id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    condition: req.body.condition,
    location: req.body.location,
    city: req.body.city || req.user.city || 'Ulsan',
    region: req.body.region || req.user.region || 'Nam-gu',
    pickup: req.body.pickup || 'Pickup only',
    pickupWindow: req.body.pickupWindow || '',
    notes: req.body.notes || '',
    urgent: String(req.body.urgent) === 'true',
    images
  });
  res.status(201).json({ listing });
};

exports.updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found.' });
  if (String(listing.owner) !== String(req.user._id)) return res.status(403).json({ error: 'Not allowed.' });

  const fields = ['title', 'description', 'category', 'condition', 'location', 'city', 'region', 'pickup', 'pickupWindow', 'notes', 'status'];
  for (const field of fields) {
    if (req.body[field] !== undefined) listing[field] = req.body[field];
  }
  if (req.body.urgent !== undefined) listing.urgent = String(req.body.urgent) === 'true' || req.body.urgent === true;

  await listing.save();
  res.json({ listing });
};

exports.deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found.' });
  if (String(listing.owner) !== String(req.user._id)) return res.status(403).json({ error: 'Not allowed.' });
  await listing.deleteOne();
  res.json({ success: true });
};
