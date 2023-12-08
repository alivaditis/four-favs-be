import prisma from "../db"
import { createJWT, hashPassword, comparePasswords } from "../modules/auth"

const getUser = async (req, res, next) => {
  const { username } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: {
        username       
      },
      select: {
        id: true,
        username: true,
        bio: true,
        fourFavs: true,
      }
    })
  
    res.json({user: user})

  } catch (e) {
    e.type = 'input'
    next(e)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      }
    })
    res.json({users: users})
  } catch (e) {
    next(e)
  }
}



const createNewUser = async (req, res, next) => {
  try {
    const hashed = await hashPassword(req.body.password);
    
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashed
      }
    })
    
    const token = createJWT(user)
    res.json({token})

  } catch (e) {
    e.type = 'input'
    next(e)
  }
}

const signIn = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    })
  
    const isValid = await comparePasswords(req.body.password, user.password)
  
    if (!isValid) {
      res.status(401)
      res.json({message: 'invalid username and password combination'})
      return
    }
  
    const token = createJWT(user)
    res.json({token})

  } catch (e) {
    e.type = 'input'
    next(e)
  }
}

const updateFavs = async (req, res, next) => {

  const { username } = req.user;
  const { fourFavs } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { username: username },
      data: { fourFavs },
    });

    res.json(updatedUser);
  } catch (e) {
    next(e)
  }
}

export { getUser, createNewUser, signIn, updateFavs, getUsers }
