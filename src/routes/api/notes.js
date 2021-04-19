import { Router } from 'express'

import * as noteServices from '../../services/notes'
import logger from '../../helpers/logger'
import auth from '../../helpers/auth'

const router = Router()

router.use(auth.authenticate('local', { session: false }))

router.get('/', async (req, res) => {
  const notes = await noteServices.getAll()
  res.send(notes)
})

router.post('/', async (req, res) => {
  const { note: newNote } = req.body
  if (newNote) {
    const note = await noteServices.add(newNote)
    if (note.error) {
      res.status(400)
    }
    res.send(note)
  } else {
    res.status(400).send({ msg: 'Bad Status' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const note = await noteServices.getById(id)
  if (note) {
    res.send(note)
  } else {
    logger.warn(`Note ${id} doesn't exist`)
    res.status(404).send({})
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { note: updatedNote } = req.body
  const response = await noteServices.update(id, updatedNote)

  if (response.error) {
    res.status(400)
  }
  res.send(response)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  res.send(await noteServices.remove(id))
})
export default router
