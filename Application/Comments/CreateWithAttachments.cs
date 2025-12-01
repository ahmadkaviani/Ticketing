using Domain;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class CreateWithAttachments
    {
        public class Command : IRequest<Comment>
        {
            public Comment Comment { get; set; }
            public List<Attachment> Attachments { get; set; } = new();
        }

        public class Handler : IRequestHandler<Command, Comment>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Comment> Handle(Command request, CancellationToken cancellationToken)
            {
                // Attach attachments to comment
                foreach (var att in request.Attachments)
                {
                    att.CommentId = request.Comment.Id;
                    // optionally att.Comment = request.Comment;
                    request.Comment.Attachments.Add(att);
                }

                _dataContext.Comments.Add(request.Comment);
                await _dataContext.SaveChangesAsync(cancellationToken);

                return request.Comment;
            }
        }
    }
}