using System.Numerics;
using Domain;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class Detail
    {
        public class Query : IRequest<Comment>
        {
            public Guid Id { get; set; }
            public Guid Sag { get; set; }
        }

        public class Handler : IRequestHandler<Query, Comment>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Comment> Handle(Query request, CancellationToken cancellationToken)
            {

                var sag = _dataContext.Comments.ToList();
                
                var t = _dataContext.Comments.FindAsync(request.Id);
                return await _dataContext.Comments.FindAsync(request.Id);
            }
        }
    }
}