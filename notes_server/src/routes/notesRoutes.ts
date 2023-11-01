import express from 'express'
import {
  appendDataToJSONFile,
  loadQuestion,
  saveQuestion,
} from '../controllers/notesController'

const router = express.Router()

router.post('/append/:filename', appendDataToJSONFile)
router.post('/getQuestion/:filename', loadQuestion)
router.patch('/edit/:filename', saveQuestion)

export default router
