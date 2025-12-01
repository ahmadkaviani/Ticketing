using Microsoft.AspNetCore.Http;

namespace Application.DTOs
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public string TicketId { get; set; }
        public DateTime CreationDate { get; set; }
        public string UserId { get; set; }
        public List<AttachmentDto> Attachments { get; set; } = new();
    }

    public class CommentWithFilesDto
    {
        public string TicketId { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public IFormFile[]? Attachments { get; set; }
    }

    public class UploadAttachmentsDto
    {
        public Guid CommentId { get; set; }
        public IFormFile[]? Attachments { get; set; }
    }

    public class AttachmentDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string? ContentType { get; set; }
        public long Size { get; set; }
    }
}