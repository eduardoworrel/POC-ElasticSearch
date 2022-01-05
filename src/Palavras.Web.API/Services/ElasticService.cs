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
    }
}
