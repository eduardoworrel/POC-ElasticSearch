using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nest;
namespace Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PageController : ControllerBase
    {
        private IConfiguration configuration;
        public PageController(IConfiguration _configuration)
        {
            configuration = _configuration;

        }

        [HttpPost]
        [Route("Store")]
        public Page Store(Page page)
        {
            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };
            var client = ElasticService.GetClient(acess, "bruto");

            page.Datahora = DateTime.Now;
            var indexResponse = client.IndexDocument(page);

            return page;

        }
        [HttpPost]
        [Route("Clear")]
        public void Clear(List<WordRefined> WordRefineds)
        {
            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };

            var client = ElasticService.GetClient(acess, "refinado");

            client.Indices.Delete("refinado");
        }

        [HttpPost]
        [Route("StoreWord")]
        public List<WordRefined> StoreWord(List<WordRefined> WordRefineds)
        {
            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };

            var client = ElasticService.GetClient(acess, "refinado");

            client.Indices.Delete("refinado");

            foreach (var word in WordRefineds)
            {
                word.Datahora = DateTime.Now;
                var indexResponse = client.IndexDocument(word);
            }
          
            return WordRefineds;
        }

        [HttpGet]
        [Route("GetUltimaAtualizacao")]
        public string GetUltimaAtualizacao()
        {
            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };
            var client = ElasticService.GetClient(acess, "bruto");

            var searchResponse = client.Search<Page>(s => s
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
        [Route("GetRefined")]
        public IEnumerable<WordRefined> GetRefined()
        {

            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };
            var client = ElasticService.GetClient(acess, "refinado");

            var searchResponse = client.Search<WordRefined>(s => s
                .From(0)
                .Size(1000)
            );

            var words = searchResponse.Documents;

            return words;

        }
        [HttpGet]
        [Route("Get")]
        public IEnumerable<Page> Get()
        {

            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };
            var client = ElasticService.GetClient(acess, "bruto");

            var searchResponse = client.Search<Page>(s => s
                .From(0)
                .Size(1000)
            );

            var pages = searchResponse.Documents;

            return pages;

        }

        [HttpGet]
        [Route("GetGroups")]
        public List<PageWordCount> GetGroups()
        {


            List<PageWordCount> result = new List<PageWordCount>();
            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };
            var client = ElasticService.GetClient(acess, "bruto");

            var searchResponse = client.Search<Page>(s => s
                .From(0)
                .Size(1000)
            );

            var pages = (List<Page>)searchResponse.Documents;

            result = PageService.ProcessaAgrupamentoBySite(pages);


            return result;

        }

        [HttpGet]
        [Route("GetRank")]
        public List<WordCount> GetRank()
        {


            List<WordCount> result = new List<WordCount>();
            var acess = new ElasticAcess
            {
                url = configuration.GetSection("ElasticUrl").Value,
                user = configuration.GetSection("ElasticUser").Value,
                pass = configuration.GetSection("ElasticPass").Value
            };
            var client = ElasticService.GetClient(acess, "bruto");

            var searchResponse = client.Search<Page>(s => s
                .From(0)
                .Size(1000)
                      );

            var pages = (List<Page>)searchResponse.Documents;

            result = PageService.ProcessaAgrupamento(pages);


            return result;

        }

        [HttpGet]
        [Route("GetRankThisMonth")]
        public List<WordCount> GetRankThisMonth()
        {
            return new List<WordCount>() { };
        }

        [HttpGet]
        [Route("GetRankThisWeek")]
        public List<WordCount> GetRankThisWeek()
        {
            return new List<WordCount>() { };
        }
    }
}