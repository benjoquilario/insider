import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // if (!token) return res.status(401).send('Unauthorized');

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_JWT);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized');
  }
};

export default auth;
