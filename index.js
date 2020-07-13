exports.helloWorld = (req, res) => {
    res.send('Essa é a minha primeira função no Google Cloud Function!');
}

exports.multipleTarget = (req, res) => {
    res.send('Essa é a minha segunda função no Google Cloud Function!');
}

exports.getAllEstado = async (req, res) => {

    let result = [];
    let status = 200;

    try {
        
        const {Datastore} = require('@google-cloud/datastore');    
        const datastore = new Datastore();


        const query = datastore.createQuery('Estado');
        const [estados] = await datastore.runQuery(query);        

        
        for (let estado of estados) {

            result.push(estado);
        }
    } catch(error) {
        
        status = 500;
        throw new Error(`Ocorreu um erro inesperado em getAllEstado. Exception : ${error}`)
    }

    res.json(result).status(status);
}