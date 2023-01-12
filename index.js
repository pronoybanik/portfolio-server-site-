const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express();
const port = process.env.POST || 5000;
require('dotenv').config()



app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lijbrwd.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    const portfolioProjectCollection = client.db('portfolioProject').collection('projectData');

    try {

        app.get('/portfolioProject', async (req, res) => {
            const query = {}
            const data = await portfolioProjectCollection.find(query).toArray();
            res.send(data)
        })

        app.post('/portfolioProject', async (req, res) => {
            const request = req.body;
            const data = await portfolioProjectCollection.insertOne(request)
            res.send(data)
        })



    }
    finally {

    }
}
run().catch(error => console.log(error))


app.get('/', (req, res) => {
    res.send('portfolio server running');
});

app.listen(port, () => {
    console.log(`portfolio server ${port}`);
});