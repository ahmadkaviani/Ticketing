using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class List
    {

        public class Query : IRequest<List<Ticket>> {}

        public class Handler : IRequestHandler<Query, List<Ticket>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<List<Ticket>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _dataContext.Tickets.ToListAsync<Ticket>();
            }
        }

    }

}