using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tickets
{

    public class Edit
    {
        public class Command : IRequest
        {
            public Ticket Ticket { get; set; }
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
                Ticket ticket = await _dataContext.Tickets.FindAsync(request.Ticket.Id);
                //ticket.Title = request.Ticket.Title ?? ticket.Title;
                _mapper.Map(request.Ticket,ticket);

                await _dataContext.SaveChangesAsync();

                return Unit.Value;

            }
        }

    }
}