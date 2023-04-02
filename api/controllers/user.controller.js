import createError from "../utils/createError.js";
import User from "../models/user.model.js";

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Your account has been deleted!");
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  const { password, ...info } = user._doc;
  res.status(200).send(info);
};

export { deleteUser, getUser };
