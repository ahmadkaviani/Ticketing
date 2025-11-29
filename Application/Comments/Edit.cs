using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Comments
{

    public class Edit
    {
        public class Command : IRequest
        {
            public Comment Comment { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Comment comment = await _dataContext.Comments.FindAsync(request.Comment.Id);
                //ticket.Title = request.Ticket.Title ?? ticket.Title;
                _mapper.Map(request.Comment,comment);

                await _dataContext.SaveChangesAsync();

                return Unit.Value;

            }
        }

    }
}