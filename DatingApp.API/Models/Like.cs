namespace DatingApp.API.Models
{
    public class Like
    {
        // don't use LikeId as primarykey, I use combination of LikerId and LikeeIdinstead, because i don't want user to be like other user more than once
        public int LikerId { get; set; } // u1 liked other user
        public int LikeeId { get; set; } // u1 being like by other user
        public User Liker { get; set; } // user who like
        public User Likee { get; set; } // user who being liked(passive voice)
    }
}