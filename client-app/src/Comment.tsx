export interface Comment {
  id: string;
  ticketId: string;
  text: string;
  creationDate: string;
  userId: string;
  attachments?: Attachment[];
  }
  

  export interface Attachment {
  id: string;
  fileName: string;
  contentType?: string | null;
  size: number;
}
