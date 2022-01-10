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
        public string GetUltimaAtualizacao()
        {

            var searchResponse = client.Search<PalavraRefinada>(s => s
                .From(0)
                .Take(1)
                .Sort(sort =>
                    sort.Descending(f => f.Datahora)
                    )
            );

            var page = searchResponse.Documents.First();

            return page.Datahora.ToString("dd/MM/yyyy HH:mm");

        }

        [HttpGet]
        [Route("GetClasses")]
        public List<string?> GetClasses()
        {

            List<string?> result = new();

            var searchResponse = client.Search<PalavraRefinada>(s => s
                .From(0)
                .Size(10000)
                      );

            var pages = (List<PalavraRefinada>)searchResponse.Documents;

            result = PageWordService.ProcessaClasses(pages);
            return result;

        }

        [HttpGet]
        [Route("GetGroups")]
        public List<GrupoPalavraFinal> GetGroups()
        {

            List<GrupoPalavraFinal> result = new();
            
            var searchResponse = client.Search<PalavraRefinada>(s => s
                .From(0)
                .Size(10000)
            );

            var pages = (List<PalavraRefinada>)searchResponse.Documents;

            result = PageWordService.ProcessaRankAgrupado(pages);


            return result;

        }

        [HttpGet]
        [Route("GetRank")]
        public List<PalavraFinal> GetRank()
        {


            List<PalavraFinal> result = new();
         
            var searchResponse = client.Search<PalavraRefinada>(s => s
                .From(0)
                .Size(10000)
                      );

            var pages = (List<PalavraRefinada>)searchResponse.Documents;

            result = PageWordService.ProcessaRank(pages, 10);


            return result;

        }

        [HttpGet]
        [Route("GetRankThisMonth")]
        public List<PalavraFinal> GetRankThisMonth()
        {
            List<PalavraFinal> result = new();

            int lastDay = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);
            int firstDay = 01;

            var searchResponse = client.Search<PalavraRefinada>(s => s
            .Query(q => q
            .DateRange(r => r
                .Field(f => f.Datahora)
                .GreaterThanOrEquals(new DateTime(DateTime.Now.Year, DateTime.Now.Month, firstDay))
                .LessThan(new DateTime(DateTime.Now.Year, DateTime.Now.Month, lastDay))
            ))
            .From(0)
            .Size(10000)
            );

            var pages = (List<PalavraRefinada>)searchResponse.Documents;

            result = PageWordService.ProcessaRank(pages, 10);

            return result;


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