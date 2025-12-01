using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;

namespace Application.Comments
{
    public class UploadAttachments
    {
        public class Command : IRequest<List<Attachment>>
        {
            public Guid CommentId { get; set; }
            public List<Attachment> Attachments { get; set; } = new();
        }

        public class Handler : IRequestHandler<Command, List<Attachment>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<Attachment>> Handle(Command request, CancellationToken cancellationToken)
            {
                var comment = await _dataContext.Comments.FirstOrDefaultAsync(c => c.Id == request.CommentId, cancellationToken);
                if (comment == null) return null!; // caller should check for null

                foreach (var att in request.Attachments)
                {
                    att.CommentId = comment.Id;
                    comment.Attachments.Add(att);
                }

                await _dataContext.SaveChangesAsync(cancellationToken);
                return request.Attachments;
            }
        }
    }
}
