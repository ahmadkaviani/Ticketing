using API.DTOs;
using Application.Comments;
using Application.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class CommentsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("{ticketId}")]
        public async Task<ActionResult<List<CommentDto>>> GetComments(Guid ticketId)
        {
            return await Mediator.Send(new List.Query() {  TicketId = ticketId });
        }

        // //[Authorize]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Comment>> GetComment(Guid id)
        // {
        //     return await Mediator.Send(new Detail.Query() { Id = id });
        // }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateComment(CommentDto comment)
        {
            Comment c = new Comment();

            c.Id = Guid.NewGuid();
            c.TicketId = comment.TicketId.ToLower();
            c.Text = comment.Text;
            c.CreationDate = DateTime.Now;
            c.UserId = "1d3bf4c1-b32a-45cb-a1b9-fda971e2056e";

            return Ok(await Mediator.Send(new Create.Command { Comment = c }));
        }

         // create with attachments (multipart/form-data)
        [AllowAnonymous]
        [HttpPost("withFiles")]
        public async Task<IActionResult> CreateCommentWithFiles([FromForm] CommentWithFilesDto dto)
        {
            var c = new Comment
            {
                Id = Guid.NewGuid(),
                TicketId = dto.TicketId.ToLower(),
                Text = dto.Text,
                CreationDate = DateTime.Now,
                UserId = "1d3bf4c1-b32a-45cb-a1b9-fda971e2056e"
            };

            

            // build attachments data
            var attachments = new System.Collections.Generic.List<Attachment>();
            if (dto.Attachments != null && dto.Attachments.Any())
            {
                foreach (var file in dto.Attachments)
                {
                    using var ms = new MemoryStream();
                    await file.CopyToAsync(ms);

                    var att = new Attachment
                    {
                        Id = Guid.NewGuid(),
                        FileName = file.FileName,
                        ContentType = file.ContentType,
                        Size = file.Length,
                        Data = ms.ToArray(),
                        CreatedAt = DateTime.UtcNow,
                    };
                    attachments.Add(att);
                }
            }

            var result = await Mediator.Send(new CreateWithAttachments.Command
            {
                Comment = c,
                Attachments = attachments
            });

            return Ok(result);
        }

        // upload attachments to existing comment
        [AllowAnonymous]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadAttachments([FromForm] UploadAttachmentsDto dto)
        {
            if (dto.CommentId == Guid.Empty) return BadRequest("CommentId is required.");

            var attachments = new System.Collections.Generic.List<Attachment>();
            if (dto.Attachments != null && dto.Attachments.Any())
            {
                foreach (var file in dto.Attachments)
                {
                    using var ms = new MemoryStream();
                    await file.CopyToAsync(ms);

                    var att = new Attachment
                    {
                        Id = Guid.NewGuid(),
                        CommentId = dto.CommentId,
                        FileName = file.FileName,
                        ContentType = file.ContentType,
                        Size = file.Length,
                        Data = ms.ToArray(),
                        CreatedAt = DateTime.UtcNow
                    };
                    attachments.Add(att);
                }
            }

            var result = await Mediator.Send(new UploadAttachments.Command
            {
                CommentId = dto.CommentId,
                Attachments = attachments
            });

            return Ok(result);
        }

        // دانلود یک پیوست
        [AllowAnonymous]
        [HttpGet("{commentId}/attachments/{attachmentId}")]
        public async Task<IActionResult> DownloadAttachment(Guid commentId, Guid attachmentId)
        {
            var result = await Mediator.Send(new GetAttachment.Query { AttachmentId = attachmentId });
            if (result == null) return NotFound();

            return File(result.Data, result.ContentType ?? "application/octet-stream", result.FileName);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditComment(Guid id, Comment comment)
        {
            comment.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Comment = comment }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> DeleteComment(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
