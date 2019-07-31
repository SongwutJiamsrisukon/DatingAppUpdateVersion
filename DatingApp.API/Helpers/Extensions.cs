using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {                        
        //add additional header on response
        //this use to override response
        public static void AddApplicationError(this HttpResponse response, string message){
            //add additional header on response

            //new header name Application-Error
            response.Headers.Add("Application-Error",message);

            //allow new header name Application-Error display
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");

            //allow Access-Control-Allow-Origin with *
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }
    }
}