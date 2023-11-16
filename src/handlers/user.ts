import prisma from "../db"
import { createJWT, hashPassword, comparePasswords } from "../modules/auth"

const getUser = async (req, res) => {
  const { username } = req.params
  console.log(username)
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
}

const createNewUser = async (req, res) => {
  const hashed = await hashPassword(req.body.password);
  
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hashed
    }
  })
  
  const token = createJWT(user)
  res.json({token})
}

const signIn = async (req, res) => {
  console.log('username:', req.body.username)
  console.log('password:', req.body.password)
  
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
}

const updateFavs = async (req, res) => {

  const { username } = req.user;
  const { fourFavs } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { username: username },
      data: { fourFavs },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getUser, createNewUser, signIn, updateFavs }
