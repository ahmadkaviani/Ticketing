namespace Domain;

public class Comment
{
    public Guid Id {get; set;}
    public Guid TicketId {get; set;}
    public string Text {get; set;}
    public DateTime CreationDate {get; set;}
}
