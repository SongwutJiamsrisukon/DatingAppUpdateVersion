namespace DatingApp.API.Helpers
{
    public class UserParams
    {   
        //prevent user change number to get listof user to 10m
        private const int MaxPageSize = 20; 
        public int PageNumber { get; set; } = 1; // default value
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        //if client don't specify PageNumber, PageNumber default value = 1
        //if client don't specify PageSize, PageSize default value = 10
        
    }
}