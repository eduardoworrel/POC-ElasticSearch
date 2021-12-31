using Microsoft.AspNetCore.Mvc;
using Nest;
namespace Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PageController : ControllerBase
    {


        private readonly ILogger<PageController> _logger;

        public PageController(ILogger<PageController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("Store")]
        public Page Store(Page page)
        {

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
                .Size(10)
            );

            var pages = searchResponse.Documents;

            return pages;

        }

    }
}