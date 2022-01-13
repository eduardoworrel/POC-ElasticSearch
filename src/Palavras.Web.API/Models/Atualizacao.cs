using System;
namespace Palavras.Web.API.Models
{
	public class Atualizacao
	{
		public int? QuantidadePalavras { get; set; }
		public int QuantidadeClasses { get; set; }
		public string? DataInicio { get; set; }
		public string? UltimaAtualizacao { get; set; }
	}
}

