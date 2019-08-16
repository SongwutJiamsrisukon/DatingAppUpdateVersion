namespace DatingApp.API.Helpers
{
    public class UserParams
    {   
        //prevent user change number to get massive umber of user like 10 m
        private const int MaxPageSize = 20; 
        public int PageNumber { get; set; } = 1; // default value
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int UserId { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 99;
        public string OrderBy { get; set; }

        //if client don't specify PageNumber, PageNumber default value = 1
        //if client don't specify PageSize, PageSize default value = 10
        
    }
}