import express from 'express'
import {
  appendDataToJSONFile,
  getQuestion,
} from '../controllers/notesController'

const router = express.Router()

router.post('/append/:filename', appendDataToJSONFile)
router.post('/getQuestion/:filename', getQuestion)

export default router
