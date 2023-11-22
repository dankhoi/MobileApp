using System;
using System.ComponentModel.DataAnnotations;

namespace MobileBackend.Dtos.Hiking
{
    public class ObservationUpsertDto
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public DateTime Time { get; set; }

        public string Comment { get; set; }

        [Required]
        public int HikingId { get; set; }
    }
}