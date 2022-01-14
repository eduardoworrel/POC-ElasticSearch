using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nest;
using Palavras.Web.API.Models;

namespace Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PageWordController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly ElasticClient client;
        private readonly string token;

        public PageWordController(IConfiguration _configuration)
        {
            configuration = _configuration;
            token = configuration.GetSection("Token").Value;
            client = ElasticService.GetClient(new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            }, "refinado");

        }


        [HttpPost]
        [Route("Clear")]
        public void Clear(string token)
        {
            if (IsValid(token))
            {
                client.Indices.Delete("refinado");
            }
            
        }

        [HttpPost]
        [Route("StoreWord")]
        public List<PalavraRefinada> StoreWord(DocumentoRefinado documento)
        {


            if (!IsValid(documento.Token ?? "") || documento.Palavras == null)
            {
                return new List<PalavraRefinada> { };
            }

            foreach (var word in documento.Palavras)
            {
                word.Datahora = DateTime.Now;
                client.IndexDocument(word);
            }
          
            return documento.Palavras;
        }

        [HttpGet]
        [Route("GetUltimaAtualizacao")]
        public Atualizacao GetUltimaAtualizacao()
        {

            var first = client.Search<PalavraRefinada>(s => s
                .From(0)
                .Take(1)
                .Sort(sort =>
                    sort.Ascending(f => f.Datahora)
                    )
            ).Documents.First();

            var last = client.Search<PalavraRefinada>(s => s
                .From(0)
                .Take(1)
                .Sort(sort =>
                    sort.Descending(f => f.Datahora)
                    )
            ).Documents.First();

            var pages = ElasticService.GetAllDocumentsInIndex<PalavraRefinada>(client, "refinado");
             

            return new Atualizacao
            {
                QuantidadeClasses = PageWordService.ProcessaClasses((List<PalavraRefinada>)pages).Count,
                QuantidadePalavras = pages.Count(),
                DataInicio = first.Datahora.ToString("dd/MM/yyyy HH:mm"),
                UltimaAtualizacao = last.Datahora.ToString("dd/MM/yyyy HH:mm")
            };
            
        }

        [HttpGet]
        [Route("GetClasses")]
        public List<ClassesDePalavras> GetClasses()
        {

            var pages = ElasticService.GetAllDocumentsInIndex<PalavraRefinada>(client, "refinado");
            return PageWordService.ProcessaClasses((List<PalavraRefinada>) pages);

        }

        [HttpGet]
        [Route("GetGroups")]
        public List<GrupoPalavraFinal> GetGroups()
        {

            var pages = ElasticService.GetAllDocumentsInIndex<PalavraRefinada>(client, "refinado");
            return PageWordService.ProcessaRankAgrupado((List<PalavraRefinada>) pages);
            
        }

        [HttpGet]
        [Route("GetRank")]
        public List<PalavraFinal> GetRank()
        {

            var pages = ElasticService.GetAllDocumentsInIndex<PalavraRefinada>(client, "refinado");          
            return PageWordService.ProcessaRank((List<PalavraRefinada>) pages, 10);

        }

        [HttpGet]
        [Route("GetRankThisWeek")]
        public List<PalavraRefinada> GetRankThisWeek()
        {
            return new List<PalavraRefinada>() { };
        }

        private bool IsValid(string GetedToken) => GetedToken == token;

    }
}