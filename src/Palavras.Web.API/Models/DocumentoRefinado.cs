using System;

namespace Palavras.Web.API.Models
{
	public class DocumentoRefinado
	{
		public string? Token { get; set; }
		public List<PalavraRefinada>? Palavras { get; set; }
		
	}
}

