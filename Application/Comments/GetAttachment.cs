using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Comments
{
    public class GetAttachment
    {
        public class Query : IRequest<Attachment?>
        {
            public Guid AttachmentId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Attachment?>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Attachment?> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _dataContext.Attachments.FirstOrDefaultAsync(a => a.Id == request.AttachmentId, cancellationToken);
            }
        }
    }
}
