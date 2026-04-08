const tranferMoney = async (req, res) => {
  let { amount, to } = req.body;
  amount = Number(amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (req.userId === to) {
    return res.status(400).json({ message: "Cannot transfer to self" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const sender = await Account.findOne({ userid: req.userId }).session(
      session,
    );
    async (req, res) => {
      let { amount, to } = req.body;
      amount = Number(amount);

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      if (req.userId === to) {
        return res.status(400).json({ message: "Cannot transfer to self" });
      }

      const session = await mongoose.startSession();

      try {
        session.startTransaction();
        const sender = await Account.findOne({ userid: req.userId }).session(
          session,
        );
        if (!sender) {
          throw new Error("Sender not found");
        }
        if (sender.balance < amount) {
          throw new Error("Insufficient funds");
        }
        const receiver = await Account.findOne({ userid: to }).session(session);
        if (!receiver) {
          throw new Error("Receiver not found");
        }

        await Account.updateOne(
          { userid: req.userId },
          { $inc: { balance: -amount } },
          { session },
        );
        await Account.updateOne(
          { userid: to },
          { $inc: { balance: amount } },
          { session },
        );
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "Transfer successful" });
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ err: err.message });
      }
    };
    if (!sender) {
      throw new Error("Sender not found");
    }
    if (sender.balance < amount) {
      throw new Error("Insufficient funds");
    }
    const receiver = await Account.findOne({ userid: to }).session(session);
    if (!receiver) {
      throw new Error("Receiver not found");
    }

    await Account.updateOne(
      { userid: req.userId },
      { $inc: { balance: -amount } },
      { session },
    );
    await Account.updateOne(
      { userid: to },
      { $inc: { balance: amount } },
      { session },
    );
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Transfer successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ err: err.message });
  }
};

module.exports = { tranferMoney };
