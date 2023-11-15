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
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({message: 'invalid username and password combination'})
  }

  const token = createJWT(user)
  res.json({token})
}

export { getUser, createNewUser, signIn }
