# google-cloud-function-studies
Estudos utilizando arquitetura Servelless com o Google Cloud Function + Firestore/Datastore

Esse projeto faz uso do framework google-cloud/functions-framework, instaldo da seguinte maneira : 

```
npm install @google-cloud/functions-framework
```

O fremework @google-cloud/functions-framework é baseado no Express e por tanto toda a documentação d
do Express pode ser aplicada.

Não há impedimentos para uso de outras bibliotecas sendo obrigatório a referência das mesmas no package.json.


# Mini Tutorial de Referência

[Tutorial Google Cloud Functions Framework](https://www.google.com)

# Deploy
Para fazer o deploy de Funções no Google Cloud Functions via CLI você precisa primeiramente possuir o Google-CLI (gcloud) configurado e tendo isso, é só usar o comando de exemplo abaixo substituido sua função targete que será "deployada"

```
gcloud functions deploy "helloWorld" --trigger-http --runtime="nodejs10"
```


