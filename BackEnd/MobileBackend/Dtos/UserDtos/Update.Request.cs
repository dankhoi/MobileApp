using System.ComponentModel.DataAnnotations;
using MobileBackend.Models;

namespace MobileBackend.Dtos.UserDtos
{
    public class UpdateRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        [Required]
        public Role Role { get; set; }
        public string Password { get; set; }
    }
}