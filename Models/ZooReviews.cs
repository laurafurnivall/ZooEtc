using Microsoft.Net.Http.Headers;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using ZooEtc.Models;

namespace ZooEtc.Models
{
    public class ZooReviews
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ZooId { get; set; }

        public string ReviewDate { get; set; }

        [Range(1, 5, ErrorMessage = "Animal care rating must be between 1 and 5.")]
        public int AnimalCare { get; set; }

        [Range(1, 5, ErrorMessage = "Culture rating must be between 1 and 5.")]
        public int Culture { get; set; }

        [Range(1, 5, ErrorMessage = "Conservation Initiative rating must be between 1 and 5.")]
        public int ConservationInitiative { get; set; }

        [Range(1, 5, ErrorMessage = "Salary rating must be between 1 and 5.")]
        public int Salary { get; set; }

        [Range(1, 5, ErrorMessage = "Benefits rating must be between 1 and 5.")]
        public int Benefits { get; set; }

        [Range(1, 5, ErrorMessage = "Leadership rating must be between 1 and 5.")]
        public int Leadership { get; set; }

        [Range(1, 5, ErrorMessage = "Inclusivity rating must be between 1 and 5.")]
        public int Inclusivity { get; set; }

        public string Comments { get; set; }

        public bool isApproved { get; set; }
        public Zoos Zoo { get; set; }

        public int AverageRating
        {
            get
            {
                var ratings = new[]
                {
                    AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity
                };

                var average = (int)ratings.Average();
                return average;
            }
        }
    }
}
