const axios = require('axios');
const { addOrUpdateCharacter } = require('./dynamo.js')

const seedData = async () => {
    const url = 'http://hp-api.herokuapp.com/api/characters';
    try {
        const { data: characters } = await axios.get(url);
        const characterPromises = characters.map((character, i) =>
            addOrUpdateCharacter({ ...character, id: i + '' })
        );
        await Promise.all(characterPromises);
    } catch (err) {
        console.error(err);
        console.log('aint no way... error.');
    }
};

seedData();
console.log("testing");