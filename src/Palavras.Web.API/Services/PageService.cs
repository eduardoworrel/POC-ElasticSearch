using System;
using System.Collections.Generic;
using Services;
using System.Linq;
using Api;

namespace Services
{
    public class PageService
    {
        public static List<PageWordCount> ProcessaAgrupamentoBySite(List<Page> pages)
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
                .Where(i =>
                i.Word != "&"
                && i.Word != "mais"
                && i.Word != "g1"
                && i.Word != "nas"
                && i.Word != "cnn"
                && i.Word != ""
                && i.Word != " "
                && i.Word != "o"
                && i.Word != "com"
                && i.Word != "2") // transformação precisa melhorar 
                .Take(5)
                .ToList();

                PageWordCount.WordCounts.AddRange(WordGroups ?? new List<WordCount> { });

                listWordCount.Add(PageWordCount);
            }
            return listWordCount;

        }
        public static List<WordCount> ProcessaAgrupamento(List<Page> pages)
        {
            var listWordCount = new List<WordCount> { };
            var FullText = string.Empty;


            foreach (Page page in pages)
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
            .Where(i =>
            i.Word != "&"
            && i.Word != "mais"
            && i.Word != "g1"
            && i.Word != "nas"
            && i.Word != "cnn"
            && i.Word != ""
            && i.Word != " "
            && i.Word != "com"
            && i.Word != "o"
            && i.Word != "2") // reaply blacklist?
            .Take(15)
            .ToList();

            listWordCount.AddRange(WordGroups ?? new List<WordCount> { });         
            return listWordCount;

        }
    }
}