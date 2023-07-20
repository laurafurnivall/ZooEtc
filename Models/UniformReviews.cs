using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using ZooEtc.Models;

namespace ZooEtc.Models
{
    public class UniformReviews
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        
        public int UniformId { get; set; }

        public string ReviewDate { get; set; }

        [Range(1, 5, ErrorMessage = "Longevity rating must be between 1 and 5.")]
        public int Longetivity { get; set; }

        [Range(1, 5, ErrorMessage = "Versatility rating must be between 1 and 5.")]
        public int Versatility { get; set; }

        [Range(1, 5, ErrorMessage = "Comfort rating must be between 1 and 5.")]
        public int Comfort { get; set; }

        [MaxLength(255)]
        public string Comments { get; set; }
        public bool isApproved { get; set; }

        public Uniforms Uniform { get; set; }

        public double AverageRating
        {
            get
            {
                var ratings = new[]
                {
                    Longetivity, Versatility, Comfort
                };

                var average = (double)ratings.Average();
                return average;
            }
        }
    }
}
