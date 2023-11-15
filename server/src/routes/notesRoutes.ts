import express from 'express'
import {
  appendChat,
  loadChat,
  updateChat,
} from '../controllers/notesController'

const router = express.Router()

router.post('/append/:filename', appendChat)
router.post('/getQuestion/:filename', loadChat)
router.patch('/edit/:filename', updateChat)

export default router
