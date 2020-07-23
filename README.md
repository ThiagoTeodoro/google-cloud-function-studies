# google-cloud-function-studies
Estudo sobre a arquitetura Serverless com o Google Cloud Function + Firestore/Datastore

Esse projeto faz uso do framework google-cloud/functions-framework, instaldo da seguinte maneira : 

```
npm install @google-cloud/functions-framework
```

O fremework @google-cloud/functions-framework é baseado no Express e por tanto toda a documentação do Express pode ser aplicada.

Não há impedimentos para uso de outras bibliotecas sendo obrigatório a referência das mesmas no package.json.

## Sobre o projeto

### Função getAllEstado

```
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
```

A função acima representa a implementação necessária para que seja recuperado do Datastore, todos os estados armazenados na entidade (Kind) Estados.

O link para utilização da função com acionador rest em produção é o seguinte : [Function getAllEstado](https://us-central1-thiago-studies-2020.cloudfunctions.net/getAllEstado)


# Mini Tutorial de Referência

[Tutorial Google Cloud Functions Framework](https://cloud.google.com/functions/docs/functions-framework?hl=pt-br)

# Deploy
Para fazer o deploy de Funções no Google Cloud Functions via CLI você precisa primeiramente possuir o Google-CLI (gcloud) configurado e tendo isso, é só usar o comando de exemplo abaixo substituido sua função targete que será "deployada"

```
gcloud functions deploy "helloWorld" --trigger-http --runtime="nodejs10"
```

É possivel passar mais parâmetros além de --trigger-http e --runtime, para especificar por exemplo, a quantidade de memória e timeout máximo da function, porém isso é mais fácil de se fazer editando a função no console WEB após o Deploy inicial.

# Firestore Nativo (Datastore)

O projeto possui um exemplo em getAllEstado e getEstado exemplificando como conectar e obter dados do Google Cloud Firestore/Datastore. Essas funções fazem uso da biblioteca @google-cloud/datastore.

Importante lembrar que para que o Firestore/Datastore funcione localmente na sua maquina é necessário que váriavel de ambiente $GOOGLE_APPLICATION_CREDENTIALS esteja apontando para seu arquivo keyFile.json obtido no Google Cloud Console.

Também foi observado com o Firestore Nativo (Datastore) só supurta filtro de campos (Consulta com clausulas Where por exemplo) se o campo
da condição estiver indexado, se o mesmo não estiver, a consulta não irá funcionar.