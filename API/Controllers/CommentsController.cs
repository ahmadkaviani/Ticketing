using Application.Comments;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CommentsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("{ticketId}")]
        public async Task<ActionResult<List<Comment>>> GetComments(Guid ticketId)
        {
            return await Mediator.Send(new List.Query() {  TicketId = ticketId });
        }

        // //[Authorize]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Comment>> GetComment(Guid id)
        // {
        //     return await Mediator.Send(new Detail.Query() { Id = id });
        // }

        [HttpPost]
        public async Task<IActionResult> CreateComment(Comment comment)
        {
            return Ok(await Mediator.Send(new Create.Command { Comment = comment }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditComment(Guid id, Comment comment)
        {
            comment.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Comment = comment }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> DeleteComment(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
