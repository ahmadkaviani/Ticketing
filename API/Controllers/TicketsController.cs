using Application.Tickets;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TicketsController : BaseApiController
    {
        //[AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> GetTickets()
        {
            return await Mediator.Send(new List.Query());
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(Guid id)
        {
            return await Mediator.Send(new Detail.Query() { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(Ticket ticket)
        {
            return Ok(await Mediator.Send(new Create.Command { Ticket = ticket }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTicket(Guid id, Ticket ticket)
        {
            ticket.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Ticket = ticket }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
