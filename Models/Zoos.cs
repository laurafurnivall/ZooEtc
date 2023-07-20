using System.ComponentModel.DataAnnotations;

namespace ZooEtc.Models
{
    public class Zoos
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string ZooName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [Required]
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ZooImgUrl { get; set; }

        [Required]
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ZooUrl { get; set; }

        public string Description { get; set; }

    }
}
