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
            var listWordCount = new List<PageWordCount> { };

            foreach (var group in pages.GroupBy(g => g.Key))
            {
                var PageWordCount = new PageWordCount
                {
                    Site = group.Key,
                    WordCounts = new List<WordCount> { }
                };
                var FullText = string.Empty;
                foreach (Page page in group)
                {
                    FullText += page.Data;
                }
                var splited = FullText.Trim().Split(" ");

                var WordGroups = splited?.GroupBy((item) => item)
                .Select(group => new WordCount
                {
                    Word = group.Key,
                    Count = group.Count()
                })
                .OrderByDescending(item => item.Count)
                .Where(i => i.Word != "&"
                && i.Word != "mais"
                && i.Word != "g1"
                && i.Word != ""
                && i.Word != " "
                && i.Word != "o") // reaply blacklist?
                .Take(10)
                .ToList();

                PageWordCount.WordCounts.AddRange(WordGroups ?? new List<WordCount> { });

                listWordCount.Add(PageWordCount);
            }
            return listWordCount;

        }
    }
}