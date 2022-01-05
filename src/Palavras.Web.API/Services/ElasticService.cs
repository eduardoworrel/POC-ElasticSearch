using System;
using System.Collections.Generic;
using Nest;

namespace Services
{
    public class ElasticService{
        public static ElasticClient GetClient(string defaultIndex){
            var settings = new ConnectionSettings(new System.Uri("http://elastic:password@eduardoworrel.com:9200"))
                  .DefaultIndex("bruto");

            return new ElasticClient(settings);
        }
    }
}
