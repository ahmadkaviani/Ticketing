using MediatR;
using Microsoft.EntityFrameworkCore.Metadata;
using Persistence;

namespace Application.Tickets
{
    public class Delete 
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
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
                var ticket = await _dataContext.Tickets.FindAsync(request.Id);

                _dataContext.Remove(ticket);

                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}