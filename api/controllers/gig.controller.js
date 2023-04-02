import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller)
      return next(createError(403, "Only sellers can create a gig!"));

    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });

    const savedGig = await newGig.save();
    res.status(201).send(savedGig);
  } catch (error) {
    next(error);
  }
};

const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted.");
  } catch (error) {
    next(error);
  }
};

const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};

const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.category && { category: q.category }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};

export { createGig, deleteGig, getGig, getGigs };
