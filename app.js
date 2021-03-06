const express = require('express');
const app = express();
const { 
    getCharacters, 
    getCharacterbyId,
    addOrUpdateCharacter,
    deleteCharacter 
} = require('./dynamo');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World - this is the index page');
});

app.get('/characters', async (req, res) => {
    try {
        const characters = await getCharacters();
        res.json(characters);
    } catch (error) {
        console.error(err);
        res.status(500).json({ err: "something went wrong" })
    }
})

app.get('/characters/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const characters = await getCharacterbyId(id);
        res.json(characters);
    } catch (error) {
        console.error(err);
        res.status(500).json({ err: "something went wrong" })
    }
});

app.post('/characters', async (req, res) => {
    const character = req.body;
    try {
        const newCharacter = await addOrUpdateCharacter(character);
        res.json(newCharacter);
    } catch (error) {
        console.error(err);
        res.status(500).json({ err: "something went wrong" })
    }
});

app.put('/characters/:id', async (req, res) => {
    const character = req.body;
    const { id } = req.params;
    character.id = id;
    try {
        const updatedCharacter = await addOrUpdateCharacter(character);
        res.json(updatedCharacter);
    } catch (error) {
        console.error(err);
        res.status(500).json({ err: "something went wrong" })
    }
});

app.delete('/characters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteCharacter(id));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'something went wrong' });
    }
});

const port = process.env.PORT || 4949;

app.listen(port, () => {
    console.log('listening on port...');
});