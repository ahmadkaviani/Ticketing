using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<List<Comment>>
        { 
            public Guid TicketId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Comment>>
        {
            private readonly DataContext _dataContext;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext dataContext, UserManager<AppUser> userManager)
            {
                _dataContext = dataContext;
                _userManager = userManager;
            }

            public async Task<List<Comment>> Handle(Query request,CancellationToken cancellationToken)
            {
                return await _dataContext.Comments
                .Where(c => c.TicketId.ToString().Equals(request.TicketId.ToString()))
                .AsNoTracking()
                .OrderBy(c => c.CreationDate) 
                .ToListAsync(cancellationToken);
            }
        }
    }
}
