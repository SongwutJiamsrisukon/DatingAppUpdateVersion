using System;

namespace DatingApp.API.Dtos
{
    public class MessageAndUserDataForReturnDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; } //(Message declare User Sender) AutoMapper can map SenderId to (User)Id
        public string SenderKnownAs { get; set; } //(Message declare User Sender) AutoMapper can map SenderKnownAs to (User)KnownAs
        public string SenderPhotoUrl { get; set; } //AutoMapper can't map because User don't declare PhotoUrl

        public int RecipientId { get; set; } //(Message declare User Recipient) AutoMapper can map RecipientId to (User)Id
        public string RecipientKnownAs { get; set; } //(Message declare User Recipient) AutoMapper can map RecipientKnownAs to (User)KnownAs
        public string RecipientPhotoUrl { get; set; } //AutoMapper can't map because User don't declare PhotoUrl
        
        public string Content { get; set; }
        public bool IsRead { get; set; }

        // want null value if receiver not reading yet
        public DateTime? ReadTime { get; set; }
        public DateTime SentTime { get; set; }
    }
}