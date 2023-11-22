using Microsoft.EntityFrameworkCore;
using MobileBackend.Models;

namespace MobileBackend.DbContext
{
    public class ApplicationDbContext: Microsoft.EntityFrameworkCore.DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }
        public DbSet<Hiking> Hikings { get; set; }
        public DbSet<Observation> Observations { get; set; }
        public DbSet<User> Users { get; set; }
    }
}