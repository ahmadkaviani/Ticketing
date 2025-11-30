import React, { useEffect, useState } from 'react';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { Comment } from './Comment';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import './index.css';
import { toFarsiStatus, toShamsiDateTime } from './common/Helper';
import { Link } from 'react-router-dom';
import agent from './api/agent';

interface Props 
{
    ticketId : string
}

export default observer (function CommentList(props : Props) {


    const loading = false;
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchTicket = async () => {
            const comments = await agent.Comments.list(props.ticketId);
            setComments(comments);
        };

        fetchTicket();
        
    }, []);


    if (loading) return <div>بارگذاری ...</div>;

    return (
        <Segment>
            <Item.Group divided>
                {comments.map((item) => (
                    <Item key={item.id} >
                        <Item.Content>
                            <Item.Description as={'a'}>{item.text}</Item.Description>
                            {/* <item.Meta>{item.title}</item.Meta> */}
                            <Item.Description>
                                
                            </Item.Description>
                            <Item.Extra>
                                <div>{toShamsiDateTime(item.creationDate)}</div>
                                {/* <Button floated='right' content='Delete' onClick={() => { }} color='red'></Button> */}
                                {/* <Button floated='right' content='مشاهده' onClick={() => { ticketStore.selectTicket(item.id); }} color='blue'></Button> */}
                                {/* <Button floated='right' content='مشاهده' as={Link} to={'/comments/' + (item.id) } color='blue'></Button>
                                <Label basic content={toFarsiStatus(item.status)}></Label> */}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
                )
                }</Item.Group>
        </Segment>
    )
})