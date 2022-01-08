using System;

namespace Palavras.Web.API.Models
{
    public class PalavraRefinada
    {
        public string? Site { get; set; }    
        public string? Word { get; set; }    
        public string? Class { get; set; }
        public int? Count { get; set; }
        public DateTime Datahora { get; set; }

    }
}
