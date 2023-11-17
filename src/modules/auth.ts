import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const comparePasswords = (password, hashed) => {
  return bcrypt.compare(password, hashed)
}

const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  )
  return token
}

const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({message: 'not authorized'})
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    res.status(401)
    res.json({message: 'not valid token'})
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    return;
  } catch (err) {
    console.error(err);
    res.status(401);
    res.send("Not authorized");
    return;
  }
}


export { comparePasswords, hashPassword, createJWT, protect }