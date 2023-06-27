import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { format } from 'date-fns';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
    activity: Activity
}

export default function ActivityListItem(props: Props) {
    return (
        <Segment.Group>
            <Segment>
                {props.activity.isCancelled &&
                    <Label attached='top'
                    color='red'
                    content='Cancelled'
                    style={{ textAlign: 'center' }} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 3} } size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${props.activity.id}`}>
                                {props.activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by {props.activity.host?.displayName}
                            </Item.Description>
                            {props.activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {props.activity.isGoing && !props.activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format( props.activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {props.activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={props.activity.appusers!} />
            </Segment>
            <Segment clearing>
                <span>
                    {props.activity.description}
                    <Button
                        as={Link}
                        to={`/activities/${props.activity.id}`}
                        color='teal'
                        floated='right'
                        content='View'
                    />
                </span>
            </Segment>
        </Segment.Group>
    );
}