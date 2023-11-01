import { INoteData } from './INoteData'
import { INoteIndex } from './INoteIndex'

export interface INoteEdit {
  noteIndex: INoteIndex
  note: INoteData
}
