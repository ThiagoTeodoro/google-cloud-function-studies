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

O link para utilização da função com acionador REST (Verbo GET) em produção é o seguinte : [Function getAllEstado](https://us-central1-thiago-studies-2020.cloudfunctions.net/getAllEstado)


### Função getEstadoByKey

```
/**
 * Função responsável por recuperar via POST um Estado pela sua UF gravada no Datastore.
 */
exports.getEstadoByUf = async (req, res) => {

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
```
A função acima representa a implementação necessária para que seja recuperado do Datastore, todos os estados armazenados na entidade (Kind) Estados em que a UF corresponda com uma UF armazenada.

O link para utilização da função com acionador REST (Verbo POST) em produção é o seguinte : [Function getEstadoByUf](https://us-central1-thiago-studies-2020.cloudfunctions.net/getEstadoByKey), para essa função, temos que enviar no corpo da requisiçaõ por exemplo os dados da UF desejada : 

```
{
	"uf": "MG"
}
```

# Mini Tutorial de Referência

[Tutorial Google Cloud Functions Framework](https://cloud.google.com/functions/docs/functions-framework?hl=pt-br)

# Deploy

Para fazer o deploy de Funções no Google Cloud Functions via CLI você precisa primeiramente possuir o Google-CLI (gcloud) configurado e com isso, é só usar o comando de exemplo abaixo substituindo sua função target que que deseja colocar em produção.

```
gcloud functions deploy "helloWorld" --trigger-http --runtime="nodejs10"
```

É possível passar mais parâmetros além de --trigger-http e --runtime, para especificar por exemplo, a quantidade de memória e timeout máximo da function, porém isso é mais fácil de se fazer editando a função no console WEB após o Deploy inicial.

# Firestore Nativo (Datastore)

O projeto possui duas funções de exemplo getAllEstado e getEstadoByUf exemplificando como conectar e obter dados do Google Cloud Firestore/Datastore. Essas funções fazem uso da biblioteca @google-cloud/datastore.

Importante lembrar que para que o Firestore/Datastore funcione localmente na sua maquina é necessário que a variável de ambiente $GOOGLE_APPLICATION_CREDENTIALS esteja apontando para seu arquivo keyFile.json obtido no Google Cloud Console.

Também  importante lembrar que o Firestore Nativo (Datastore) só suporta filtros de campos (Consulta com clausulas Where por exemplo) se o campo da condição/filtro estiver indexado, se o mesmo não estiver, a consulta não irá funcionar.

# Conclusões

No quesito praticidade, entrega continua e separação de responsabilidades foi observado um ganho grande, o que, dependendo do contexto da aplicação pode contribuir e muito para manutenção e divisão de responsabilidades.

Quanto a parte de custo, o Google Cloud Functions oferece uma camada Free na casa de 2 milhões de requisições. Isso quer dizer que, caso seu sistema opere numa casa de 1 requisição por segundo, por dia ele fará 86400 requisições o que é suficiente para funcionar por 23 dias sem nenhum custo.

Excedida essa camada, o custo de cada requisição pode variar e  irá envolver duas cobranças, uma para as requisições cujo o preço fica em 0,40USD por milhão de requisição. E um outro que está relacionado com o tempo de CPU de cada requisição conforme tabela abaixo em 20/07/2020 : 


| Memória | Processador | Valor por 0,100ms |
| --- | --- | --- |
| 128 MB | 200 MHz | US$ 0,000000231 |
| 256 MB | 400 MHz | US$ 0,000000463 |
| 512 MB | 800 MHz | US$ 0,000000925 |
| 1.024 MB | 1,4 GHz | US$ 0,000001650 |
| 2.048 MB | 2,4 GHz | US$ 0,000002900 |

Considerando isso, e funções com o modelo dois da tabela que é o mais utilizado, se uma função entregar seu resultado em 400ms que é a media o valor deverá ser multiplicado por 4, chegando assim a 0,000001852 USD, levando em conta o mesmo sistema com uma requisição por segundo e multiplicando por 86400 temos um custo por dia no quesito tempo de CPU de 0,17 USD aproximadamente... o que vai no mês ficar em torno de aproximadamente 4 USD. 

** Esses cálculos é para um sistema baseado em 256MB, 400MHz com volumes de uma requisição por segundo em média** 

### Pontos de Atenção

Embora no quesito organização de micro-serviços e preço o Google Cloud Functions se mostre extremamente atrativo, há pontos a se considerar.

Ele não resolve todos os problemas assim como toda tecnologia tem seus focos, ele é especialmente indicado para funções de estado único estatles. 

Aqui foi feito utilizando a linguagem NodeJS, por ser mais produtivo e por também consumir menos memória, porém suporta outras linguagens como Java por exemplo.

Também foi observado um tempo significativo na entrega do resultado das requisições, requisições normalmente entregues em 1 segundo ou 2 , frequentemente demoram 8 segundos para serem entregues no Google Cloud Functions, por 2 motivos investigados.

O primeiro tem relação com o ambiente, foi observado relatos que a plataforma sobe todo o ambiente de execução, executa e em seguida entrega o resultado  e destrói o ambiente, a demora pode estar vinculada a esse tempo de “levantamento do ambiente”.

O segundo tem relação com a diferença entre máquinas, cada função executa em cima de um processador e recurso de memória muito menores que maquinas comumente utilizadas e é nisso que observamos essa diferença de tempo. 