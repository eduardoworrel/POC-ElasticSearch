using System;
using System.Collections.Generic;
using Services;
using System.Linq;
using Api;

namespace Services
{
    public class PageService
    {
        public static List<PageWordCount> ProcessaAgrupamento(List<Page> pages)
        {
            var listWordCount = new List<PageWordCount>{};

            //1- agrupar series historicas das páginas por Site (Page.Key)
            foreach (var group in pages.GroupBy(g => g.Key)){
                //Para cada grupo de muitos textos, cria-se apenas um objeto PageWordCount
                var PageWordCount = new PageWordCount {
                    Site = group.Key,
                    WordCounts = new List<WordCount>{}
                };

                foreach(Page page in group){
                    var splited = page.Data?.Split(" ");
                    var WordGroups = splited?.GroupBy((item) => item)
                    .Select(group => new WordCount
                    {
                        Word = group.Key,
                        Count = group.Count()
                    }).OrderByDescending(item => item.Count).ToList();
                    PageWordCount.WordCounts.AddRange(WordGroups);
                }
                listWordCount.Add(PageWordCount);
            }
            return listWordCount;
            
        }
    }
}