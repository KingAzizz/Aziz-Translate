const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
require('dotenv').config()

app.use(cors())
app.get('/', (req,res) => {
    res.send('helo')
})

app.get('/translete', (req,res) =>{
    const fromLanguage = req.query.from
    const toLanguage = req.query.to
    const text = req.query.text
    const options = {
        method: 'GET',
        url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
        params: {text: text, to: toLanguage, from: fromLanguage},
        headers: {
          'x-rapidapi-host': 'nlp-translation.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then((response) => {
        res.json(response.data['translated_text'][toLanguage]);
      }).catch((error) => {
        console.error(error);
      });
})


app.listen(PORT, () => console.log('server is up'))