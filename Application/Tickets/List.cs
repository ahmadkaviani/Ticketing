using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class List
    {
        public class Query : IRequest<List<Ticket>> { }

        public class Handler : IRequestHandler<Query, List<Ticket>>
        {
            private readonly DataContext _dataContext;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext dataContext, UserManager<AppUser> userManager)
            {
                _dataContext = dataContext;
                _userManager = userManager;
            }

            public async Task<List<Ticket>> Handle(Query request,CancellationToken cancellationToken)
            {
                return await _dataContext.Tickets.ToListAsync<Ticket>();
            }
        }
    }
}
