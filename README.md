# Palavras mais citadas

- Pequeno sistema que coleta dados das principais páginas de noticiário e gera um ranking das palavras mais citadas

- Disponível em [palavras.eduardoworrel.com](https://palavras.eduardoworrel.com)

# Fluxo de trabalho
### NodeJS com [Puppeteer (Chromium headless)](https://github.com/puppeteer/puppeteer) 
- Para coletar as informações foi criado um projeto de ETL ([Palavras.Background.ETL](https://github.com/eduardoworrel/Palavras-ETL-ElasticSearch/tree/main/src/Palavras.Background.ETL)) resumido nas imagens a seguir.
![alt text](https://palavras.eduardoworrel.com/assets/schedule.refinado.js.png)
![alt text](https://palavras.eduardoworrel.com/assets/extract.js.png)
![alt text](https://palavras.eduardoworrel.com/assets/transform.js.png)
![alt text](https://palavras.eduardoworrel.com/assets/load.js.png)
### API com .NET6.0 e Elasticsearch
- intermediar os processos de dados resumido nas imagens a seguir
![alt text](https://palavras.eduardoworrel.com/assets/PageWordController.cs.png)
![alt text](https://palavras.eduardoworrel.com/assets/PageWordController.cs_2.png)
### SPA com ReactJS e [Dracula UI](https://ui.draculatheme.com/)
- Apresentação dos dados
![alt text](https://palavras.eduardoworrel.com/assets/ranking.jsx.png)
