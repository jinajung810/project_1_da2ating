const { startSession } = require('mongoose');

class API {
  async defaultProcess(req, res, next, fn) {
    try {
      const data = await fn();
      res.status(200);
      res.json({ result: 'ok', data });

    } catch (error) {
      next(error);
    }
  }

  async withTransaction(fn) {
    const session = await startSession();

    try {
      let resData = null;

      await session.withTransaction(async () => {
        resData = await fn(session);
      });

      session.endSession();

      return resData;

    } catch (error) {
      session.endSession();
      throw error;
    }
  }
}

module.exports = new API();