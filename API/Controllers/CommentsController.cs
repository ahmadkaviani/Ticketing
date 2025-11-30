using API.DTOs;
using Application.Comments;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


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

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateComment(CommentDto comment)
        {
            Comment c = new Comment();

            c.Id = new Guid();
            c.TicketId = comment.TicketId.ToLower();
            c.Text = comment.Text;
            c.CreationDate = DateTime.Now;
            c.UserId = "1d3bf4c1-b32a-45cb-a1b9-fda971e2056e";

            return Ok(await Mediator.Send(new Create.Command { Comment = c }));
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
