import express from "express"
import { Magic, MagicUserMetadata } from "@magic-sdk/admin"
import { config } from "../libs/config"

const router = express.Router()

const magic = new Magic(config.magicSecretKey)

router.post("/login", async (req, res) => {
  try {
    // @ts-ignore
    const didToken: string = req.headers.authorization.substr(7)
    magic.token.validate(didToken)
    res.status(200).json({ authenticated: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
