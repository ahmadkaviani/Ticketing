using MediatR;
using Microsoft.EntityFrameworkCore.Metadata;
using Persistence;

namespace Application.Comments
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
                var comment = await _dataContext.Comments.FindAsync(request.Id);

                _dataContext.Remove(comment);

                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}