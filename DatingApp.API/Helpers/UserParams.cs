namespace DatingApp.API.Helpers
{
    public class UserParams
    {   
        //prevent user change number to get listof user to 10m
        private const int MaxItemsPerPage = 20; 
        public int PageNumber { get; set; } = 1; // default value
        private int itemsPerPage = 10;
        public int ItemsPerPage
        {
            get { return itemsPerPage; }
            set { itemsPerPage = (value > MaxItemsPerPage) ? MaxItemsPerPage : value; }
        }

        //if client don't specify PageNumber, PageNumber default value = 1
        //if client don't specify PageSize, PageSize default value = 10
        
    }
}