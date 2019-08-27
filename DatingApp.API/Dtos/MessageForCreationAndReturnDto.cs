using System;

namespace DatingApp.API.Dtos
{
    public class MessageForCreationAndReturnDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime SentTime { get; set; }
        public string Content { get; set; }

        public MessageForCreationAndReturnDto()
        {
            SentTime = DateTime.Now;
        }
    }
}