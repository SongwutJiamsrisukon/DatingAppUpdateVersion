using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{

    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet] //use action when hit url with httpGet localhost:5000/api/users
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams) // [FromQuery] use to know params(?pageNumber=2&pageSize=8) on url, if no params it use default
        {
            var pagedListUsers = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(pagedListUsers);

            Response.AddPagination(pagedListUsers.CurrentPage, pagedListUsers.PageSize, pagedListUsers.TotalItems, pagedListUsers.TotalPages); //set pagination information from header
            
            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")] //use action when hit url with httpGet localhost:5000/api/users/{id}
        public async Task<ActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            //user id from url matching user id from token
            //we don't permited user id == 2 can edit data on user id ==1
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);
            _mapper.Map(userForUpdateDto,userFromRepo);// auto update value in DB but don't save yet
                                                        // if some value in userForUpdateDto is not declare, it is auto generate "" to string
            if(await _repo.SaveAll())
                return NoContent();//204

            throw new Exception($"Update user {id} failed to save");
        }
    }
}