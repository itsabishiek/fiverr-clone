import Conversation from "../models/conversation.model.js";
import createError from "../utils/createError.js";

const createConversation = async (req, res, next) => {
  try {
    const newConversation = new Conversation({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });

    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (error) {
    next(error);
  }
};

const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      {
        new: true,
      }
    );

    res.status(200).send(updatedConversation);
  } catch (error) {
    next(error);
  }
};

const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });

    res.status(200).send(conversations);
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });

    if (!conversation) return next(createError(404, "Conversation not found!"));

    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};

export {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
};
