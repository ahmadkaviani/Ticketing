import React, { useEffect, useState } from 'react';
import { Segment, Item, Button, Label, Icon } from 'semantic-ui-react';
import { Comment as CommentType, Attachment } from './Comment';
import { observer } from 'mobx-react-lite';
import './index.css';
import { toShamsiDateTime } from './common/Helper';
import agent from './api/agent';

interface Props {
  ticketId: string;
}

export default observer(function CommentList(props: Props) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await agent.Comments.list(props.ticketId);
        setComments(data);
      } catch (err) {
        console.error(err);
        // show toast / alert if needed
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [props.ticketId]);

  if (loading) return <div>بارگذاری ...</div>;

  function iconNameForAttachment(a?: Attachment) {
    if (!a || !a.contentType) return 'file outline';
    const t = a.contentType.toLowerCase();
    if (t.startsWith('image/')) return 'image';
    if (t.includes('pdf')) return 'file pdf';
    if (t.startsWith('video/')) return 'video';
    if (t.startsWith('audio/')) return 'music';
    if (t.includes('zip') || t.includes('compressed')) return 'archive';
    return 'file outline';
  }


  // دانلود با fetch (بدون axios) — مناسب و ساده
  async function handleDownload(commentId: string, attachment: Attachment) {
    try {
      const res = await fetch(`/api/comments/${commentId}/attachments/${attachment.id}`);
      if (!res.ok) {
        throw new Error('خطا در دانلود فایل');
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.fileName || 'download';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('خطا در دانلود فایل');
    }
  }

  // یا با agent (axios) اگر متد بالا را اضافه کردی:
  async function handleDownloadWithAgent(commentId: string, attachment: Attachment) {
    try {
      const blob = await agent.Comments.downloadAttachment(commentId, attachment.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.fileName || 'download';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('خطا در دانلود فایل');
    }
  }

  return (
    <Segment>
      <Item.Group divided>
        {comments.map((item) => (
          <Item key={item.id}>
            <Item.Content>
              <Item.Description as={'a'}>{item.text}</Item.Description>

              {/* attachments area */}
              {item.attachments && item.attachments.length > 0 && (
                <div style={{ marginTop: 8, marginBottom: 8 }}>
                  {item.attachments.map((att) => (
                    <Label key={att.id} style={{ marginRight: 6, marginBottom: 6 }}>
                      <Icon  style={{ marginLeft: 6 }} name={iconNameForAttachment(att) as any} />
                      <span style={{ marginLeft: 6 }}>{att.fileName}</span>
                      {/* <span style={{ marginLeft: 8, fontSize: 11, color: '#666' }}>{friendlySize(att.size)}</span> */}
                      <Button
                        compact
                        size="mini"
                        icon="download"
                        onClick={() => handleDownload(item.id, att)}
                        style={{ marginLeft: 8 }}
                      />
                    </Label>
                  ))}
                </div>
              )}

              <Item.Extra>
                <div>{toShamsiDateTime(item.creationDate)}</div>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
