using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        protected override void OnModelCreating(ModelBuilder builder){ //overide default entityframework convention(when it created table in ours database)
            builder.Entity<Like>().HasKey(k => new {k.LikerId, k.LikeeId}); //set primary key
            builder.Entity<Like>().HasOne(k => k.Likee).WithMany(k => k.Likers).HasForeignKey(k => k.LikeeId).OnDelete(DeleteBehavior.Restrict); // u1 can being liked by other users
            builder.Entity<Like>().HasOne(k => k.Liker).WithMany(k => k.Likees).HasForeignKey(k => k.LikerId).OnDelete(DeleteBehavior.Restrict); //u1 can like with many users
        }
    }
}