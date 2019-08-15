using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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

        // send back to client(Angular)
        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages){
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");

            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //convert object to JSON string(use overload2 to set camelcase on second params)
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
        }

        public static int CalculateAge(this DateTime theDateTime){
            var age =  DateTime.Today.Year - theDateTime.Year;
            if( theDateTime.AddYears(age) > DateTime.Today)
                age--;

            return age;
        }
    }
}