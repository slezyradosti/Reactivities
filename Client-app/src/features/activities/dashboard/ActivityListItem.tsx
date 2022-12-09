import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity
}

export default function ActivityListItem(props: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${props.activity.id}`}>
                                {props.activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by Bob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {props.activity.date}
                    <Icon name='marker' /> {props.activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendes go here
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