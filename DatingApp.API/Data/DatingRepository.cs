using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using static DatingApp.API.Helpers.EnumWarehouse;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
             _context.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            //var like = await _context.Likes.Where(l => l.LikerId == userId).Where(l => l.LikeeId == recipientId).FirstOrDefaultAsync();
            var like = await _context.Likes.FirstOrDefaultAsync(l => l.LikerId == userId && l.LikeeId == recipientId);
            return like;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(p => p.UserId == userId).FirstOrDefaultAsync(p => p.IsMain == true);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.AsQueryable();
            users = users.Where(u => u.Id != userParams.UserId);

            switch (userParams.TypeOfLike) {
                case TypeOfLike.None: users = users.Where(u => u.Gender == userParams.Gender);break;
                case TypeOfLike.Likers: var userLikers = await GetUserLikes(userParams.UserId, userParams.TypeOfLike);
                                        users = users.Where(u => userLikers.Contains(u.Id));break;
                case TypeOfLike.Likees: var userLikees = await GetUserLikes(userParams.UserId, userParams.TypeOfLike);
                                        users = users.Where(u => userLikees.Contains(u.Id));break;
            }

            if( userParams.MinAge != 18 || userParams.MaxAge != 99) //anyone not default value
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge-1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }
            users = users.Include(u => u.Photos);
            if(!string.IsNullOrEmpty(userParams.OrderBy)) {
                switch (userParams.OrderBy){
                    case "created": users = users.OrderByDescending(u => u.Created);break;
                    default: users = users.OrderByDescending(u => u.LastActive);break;
                }
            } else {
                users = users.OrderByDescending(u => u.LastActive); 
            }
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, TypeOfLike typeOfLike){
            var user = await _context.Users.Include(u => u.Likers).Include(u => u.Likees).FirstOrDefaultAsync(u => u.Id == id);

            if (typeOfLike == TypeOfLike.Likers){
                return user.Likers.Where(l => l.LikeeId == id).Select(l => l.LikerId); //select is return only list of likerId
            } else if (typeOfLike == TypeOfLike.Likees) {
                return user.Likees.Where(l => l.LikerId == id).Select(l => l.LikeeId); //select is return only list of likeeId
            }
            return Enumerable.Empty<int>();
            
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; //if > 0 return true
        }
    }
}