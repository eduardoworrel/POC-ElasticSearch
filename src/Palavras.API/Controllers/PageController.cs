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

        [HttpPost]
        [Route("Store")]
        public Page Store(Page page)
        {
            page.Datahora = DateTime.Now;
            var settings = new ConnectionSettings(new System.Uri("http://elastic:password@localhost:9200"))
                .DefaultIndex("bruto");

            var client = new ElasticClient(settings);
            var indexResponse = client.IndexDocument(page);

            return page;

        }

        [HttpGet]
        [Route("Get")]
        public IEnumerable<Page> Get()
        {

            var settings = new ConnectionSettings(new System.Uri("http://elastic:password@localhost:9200"))
                  .DefaultIndex("bruto");

            var client = new ElasticClient(settings);

            var searchResponse = client.Search<Page>(s => s
                .From(0)
            );

            var pages = searchResponse.Documents;

            return pages;

        }   

        [HttpGet]
        [Route("GetGroups")]
        public List<IEnumerable<IGrouping<string, string>>> GetGroups()
        {


            List<IEnumerable<IGrouping<string,string>>> result = new List<IEnumerable<IGrouping<string, string>>>();
            var settings = new ConnectionSettings(new System.Uri("http://elastic:password@localhost:9200"))
                  .DefaultIndex("bruto");

            var client = new ElasticClient(settings);

            var searchResponse = client.Search<Page>(s => s
                .From(0)
            );

            var pages = (List<Page>) searchResponse.Documents;

            pages.ForEach((page) => {
                var splited = page.Data?.Split(" ");
                var groups = splited?.GroupBy((item) => item).OrderByDescending(item => item.Count()).ToList();
                result.Add(groups);
            });
            
            return result;

        }

    }
}