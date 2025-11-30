using Domain;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest
        {
            public Comment Comment { get; set; }
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
                

                 _dataContext.Comments.Add(request.Comment);
                 await _dataContext.SaveChangesAsync();
                 return Unit.Value;
            }
        }
    }
}