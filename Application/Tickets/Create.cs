using Domain;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Create
    {
        public class Command : IRequest
        {
            public Ticket Ticket { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
          private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 _dataContext.Tickets.Add(request.Ticket);
                 await _dataContext.SaveChangesAsync();
                 return Unit.Value;
            }
        }
    }
}