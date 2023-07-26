using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Models
{
    public class Gear
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PurchaseUrl { get; set; }
        public string ImageUrl { get; set; }
        public List<GearReviews> GearReviews { get; set;}

        public List<Types> Types { get; set;}
    }
}
