using System.Numerics;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Detail
    {
        public class Query : IRequest<Ticket>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Ticket>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Ticket> Handle(Query request, CancellationToken cancellationToken)
            {

                var sag = _dataContext.Tickets.ToList();
                
                var t = _dataContext.Tickets.FindAsync(request.Id);
                return await _dataContext.Tickets.FindAsync(request.Id);
            }
        }
    }
}