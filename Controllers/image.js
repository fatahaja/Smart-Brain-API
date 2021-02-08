import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'c6484c37c9e94d0a8e6ef5ae60e98737'
});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Cannot comunicate with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .returning('entries')
    .increment('entries', 1)
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('error entries'))

}

export default { handleImage, handleAPICall };