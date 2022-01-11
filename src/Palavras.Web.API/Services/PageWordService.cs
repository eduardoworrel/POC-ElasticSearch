using System;
using System.Collections.Generic;
using Services;
using System.Linq;
using Palavras.Web.API.Models;
namespace Services
{
    public class PageWordService
    {
        public static List<GrupoPalavraFinal> ProcessaRankAgrupado(List<PalavraRefinada> words)
        {
            List<GrupoPalavraFinal> listGrupo = new();

            var group = words.GroupBy((word) => word.Site);

            foreach(var collection in group)
            {
                var grupo = new GrupoPalavraFinal
                {
                    Site = collection.Key,
                    Palavras = ProcessaRank(collection.Select(w =>
                       new PalavraRefinada
                       {
                           Word = w.Word,
                           Class = w.Class,
                           Count = w.Count,
                           Datahora = w.Datahora,
                           Site = w.Site
                       }).ToList(), 10)
                };

                listGrupo.Add(grupo);
            }
            return listGrupo;
        }
        public static List<PalavraFinal> ProcessaRank(List<PalavraRefinada> words, int take)
        {
            var group = words.GroupBy((word) => word.Word);
            var porcentagem = group.Sum(m => m.Sum(f => f.Count));

            var listWord = group.Select(g =>
                new PalavraFinal
                {
                    Palavra = g.Key,
                    Frequencia = g.Sum(f => f.Count),
                    Porcentagem = String.Format("{0:0.00}", (g.Sum(f => f.Count) / porcentagem)),
                    Classe = g.First().Class
                })
                .Where(e =>
                {
                    foreach(var c in PageWordService.ProcessaClasses(words))
                    {
                        if(e.Classe != null) { 
                            if (e.Classe != "?" && e.Classe.Contains(c.Classe))
                            {
                                return false;
                            }
                        }
                    }
                    return true; 
                })
                .OrderByDescending(e => e.Frequencia)
                .Take(take)
                .ToList();

            return listWord;

        }
        public static List<ClassesDePalavras> ProcessaClasses(List<PalavraRefinada> words)
        {
            List<ClassesDePalavras> list = new();

          
            var groupWord = words.GroupBy((word) => word.Class);

            foreach (var types in groupWord)
            {
                var range = types.Key?.Split(new string[] { ",", " e" }, StringSplitOptions.RemoveEmptyEntries)
                    .Select((i) => new ClassesDePalavras {
                        Classe = i.TrimStart(),
                        Quantidade = types.Count()
                        })
                    .ToList();
                list.AddRange(range);
            }

            return list
            .GroupBy((word) => word.Classe).Select((g) =>
                new ClassesDePalavras
                {
                    Classe = g.Key,
                    Quantidade = g.Sum(f => f.Quantidade)
                })
            .OrderBy(e => e.Classe.Length)
            .ToList();

        }
    }
}