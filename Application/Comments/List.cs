using Application.DTOs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<List<CommentDto>>
        {
            public Guid TicketId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<CommentDto>>
        {
            private readonly DataContext _dataContext;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext dataContext, UserManager<AppUser> userManager)
            {
                _dataContext = dataContext;
                _userManager = userManager;
            }

            // public async Task<List<Comment>> Handle(Query request,CancellationToken cancellationToken)
            // {
            //     return await _dataContext.Comments
            //     .Where(c => c.TicketId.ToString().Equals(request.TicketId.ToString()))
            //     .AsNoTracking()
            //     .OrderBy(c => c.CreationDate) 
            //     .ToListAsync(cancellationToken);
            // }

            public async Task<List<CommentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _dataContext.Comments
                    .Where(c => c.TicketId.ToString().Equals(request.TicketId.ToString()))
                    .Include(c => c.Attachments)
                    .AsNoTracking()
                    .OrderBy(c => c.CreationDate)
                    .ToListAsync(cancellationToken);

                // map to DTO but avoid sending Data
                return comments.Select(c => new CommentDto
                {
                    Id = c.Id,
                    TicketId = c.TicketId,
                    Text = c.Text,
                    CreationDate = c.CreationDate,
                    UserId = c.UserId,
                    Attachments = c.Attachments.Select(a => new AttachmentDto
                    {
                        Id = a.Id,
                        FileName = a.FileName,
                        ContentType = a.ContentType,
                        Size = a.Size
                    }).ToList()
                }).ToList();
            }

        }
    }
}
