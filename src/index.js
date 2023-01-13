const express = require('express')
const cors = require('cors')
const {v4} = require('uuid')


const port = 2020
const app = express()

app.use(cors())
const router = express.Router()

app.use(express.json())
app.use(router)

const products = [
    {
      id: v4(),
      title: 'Coffe Cup',
      value: '10,00',
      image: 'https://logopond.com/logos/0f873f169151d5ecceedbaddde1e7580.png',
    },
    {
      id: v4(),
      title: 'Paper Cup',
      value: '25,00',
      image: 'https://logopond.com/logos/0f873f169151d5ecceedbaddde1e7580.png',
    },
    {
      id: v4(),
      title: 'Pizza Box',
      value: '15,00',
      image: 'https://logopond.com/logos/0f873f169151d5ecceedbaddde1e7580.png',
    },
  ];

  // Listandos dos produtos
  app.get('/products', (req, res) => {
    
    return res.status(200).json(products)
  })

  // Adcionando um item no array
  app.post('/products', (req, res) => {

    const body = req.body

    products.push({ id: v4(), ...body})

    return res.json(products)

  })

  // Substituir um item pelo outro

  app.put('/products/:id', (req, res) => {
    const { id } = req.params
    const { title, value, image } = req.body

    const newItem = {id, title, value, image }

    const productsIndex = products.findIndex(products => products.id === id)

    products[productsIndex] = newItem

    return res.json(newItem)

  })

  // Deletando um item

  app.delete('/products/:id', (req, res) => {
    const { id } = req.params

    const findProductIndex = products.findIndex(item => item.id === id)

    products.splice(findProductIndex,1)

    return res.json({message: 'O produto foi deletado.'})
})



app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})

