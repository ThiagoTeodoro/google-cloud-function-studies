# google-cloud-function-studies
Estudos utilizando arquitetura Serverless com o Google Cloud Function + Firestore/Datastore

Esse projeto faz uso do framework google-cloud/functions-framework, instaldo da seguinte maneira : 

```
npm install @google-cloud/functions-framework
```

O fremework @google-cloud/functions-framework é baseado no Express e por tanto toda a documentação d
do Express pode ser aplicada.

Não há impedimentos para uso de outras bibliotecas sendo obrigatório a referência das mesmas no package.json.


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


