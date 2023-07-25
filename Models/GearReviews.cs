using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using ZooEtc.Models;

namespace ZooEtc.Models
{
    public class GearReviews
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        
        public int GearId { get; set; }

        public string ReviewDate { get; set; }

        [Range(1, 5, ErrorMessage = "Longevity rating must be between 1 and 5.")]
        public int Longevity { get; set; }

        [Range(1, 5, ErrorMessage = "Versatility rating must be between 1 and 5.")]
        public int Versatility { get; set; }

        [Range(1, 5, ErrorMessage = "Comfort rating must be between 1 and 5.")]
        public int Comfort { get; set; }

        [MaxLength(255)]
        public string Comments { get; set; }
        public bool isApproved { get; set; }

        public Gear Gear { get; set; }

        public int AverageRating
        {
            get
            {
                var ratings = new[]
                {
                    Longevity, Versatility, Comfort
                };

                var average = (int)ratings.Average();
                return average;
            }
        }
    }
}
