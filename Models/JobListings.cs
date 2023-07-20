using Microsoft.VisualBasic;
using System;
using ZooEtc.Models;

namespace ZooEtc.Models
{
    public class JobListings
    {
        public int Id { get; set; }
        public int ZooId { get; set; }
        public string Title { get; set; }
        public DateTime PostingDate { get; set; }
        public DateTime RemovalDate { get; set; }
        public string Description { get; set; }
        public string Salary { get; set; }
        public string JobUrl { get; set; }

    }
}
