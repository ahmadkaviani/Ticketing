using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TicketsController(DataContext dataContext) : BaseApiController
    {
        private readonly DataContext _dataContext = dataContext;

        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> GetTickets()
        {
            return await _dataContext.Tickets.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(Guid id)
        {
            return await _dataContext.Tickets.FindAsync(id);
        }
        
    }
}