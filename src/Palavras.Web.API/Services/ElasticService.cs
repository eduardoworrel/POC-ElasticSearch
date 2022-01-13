using System;
using System.Collections.Generic;
using Nest;

namespace Services
{
    public class ElasticAcess
    {
        public string url { get; set; }
        public string user { get; set; }
        public string pass { get; set; }
    }
    public class ElasticService{

        public static ElasticClient GetClient(ElasticAcess acess, string defaultIndex){
            var settings = new ConnectionSettings(
                new System.Uri($"http://{acess.user}:{acess.pass}@{acess.url}"))
                  .DefaultIndex(defaultIndex);

            return new ElasticClient(settings);
        }

        public static IEnumerable<T> GetAllDocumentsInIndex<T>(ElasticClient ElasticClient, string indexName, string scrollTimeout = "2m", int scrollSize = 1000) where T : class
        {
            ISearchResponse<T> initialResponse = ElasticClient.Search<T>
                (scr => scr.Index(indexName)
                     .From(0)
                     .Take(scrollSize)
                     .MatchAll()
                     .Scroll(scrollTimeout));

            List<T> results = new List<T>();

            if (!initialResponse.IsValid || string.IsNullOrEmpty(initialResponse.ScrollId))
                throw new Exception(initialResponse.ServerError.Error.Reason);

            if (initialResponse.Documents.Any())
                results.AddRange(initialResponse.Documents);

            string scrollid = initialResponse.ScrollId;
            bool isScrollSetHasData = true;
            while (isScrollSetHasData)
            {
                ISearchResponse<T> loopingResponse = ElasticClient.Scroll<T>(scrollTimeout, scrollid);
                if (loopingResponse.IsValid)
                {
                    results.AddRange(loopingResponse.Documents);
                    scrollid = loopingResponse.ScrollId;
                }
                isScrollSetHasData = loopingResponse.Documents.Any();
            }

            ElasticClient.ClearScroll(new ClearScrollRequest(scrollid));
            return results;
        }
    }
}
