/**
 * Função responsável por consultar via GET todos os estdos gravados no Datastore
 */
exports.getAllEstado = async (req, res) => {

    let result = [];
    let status = 200;

    try {
        
        const {Datastore} = require('@google-cloud/datastore');    
        const datastore = new Datastore();


        const query = datastore.createQuery('Estados');
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

/**
 * Função responsável por recuperar via POST um Estado pela sua key gravada no Datastore.
 */
exports.getEstadoByKey = async (req, res) => {

    let result = [];
    let status = 200;

    try {
        
        const {uf} = req.body;
        
        const {Datastore} = require('@google-cloud/datastore');    
        const datastore = new Datastore({
             projectId: "thiago-studies-2020"
        });

        const query = datastore.createQuery('Estados').filter("UF", "=", uf);    
        const [returns] = await datastore.runQuery(query);        
                

        for (let aux of returns) {

            result.push(aux);
        }
    } catch(error) {
        
        status = 500;
        throw new Error(`Ocorreu um erro inesperado em getByEstado. Exception : ${error}`)
    }

    res.json(result).status(status);    
}