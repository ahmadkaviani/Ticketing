namespace Domain;

public class Ticket
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime InitiateTime { get; set; }
    public DateTime LastModifiedTime { get; set; }
    public string Status { get; set; }
}
