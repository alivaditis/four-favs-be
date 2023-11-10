import { Router } from 'express'

const router = Router()

router.get("/user", (req, res) => {
  res.json({ message: "user" });
});
router.get("/user/:id", (req, res) => {
  res.json('hello')
});
router.post("/user", (req, res) => {});
router.put("/user/:id", (req, res) => {});
router.delete("/user/:id", (req, res) => {});

export default router
