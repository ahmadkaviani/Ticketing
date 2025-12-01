namespace Domain
{
    public class Attachment
    {
        public Guid Id { get; set; }
        public Guid CommentId { get; set; }
        public Comment? Comment { get; set; }

        public string FileName { get; set; } = string.Empty;
        public string? ContentType { get; set; }
        public long Size { get; set; }
        public byte[] Data { get; set; } = Array.Empty<byte>();

        public DateTime CreatedAt { get; set; }
    }

}