import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Profile } from '../../../app/models/profile'
import { Activity } from '../../../app/models/activity'
import App from '../../../app/layout/App'
interface Props {
    activity: Activity;
}

export default observer(function ActivityDetailedSidebar({activity: { appusers, host }}: Props) {
    if (!appusers) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {appusers.length} {appusers.length === 1 ? 'Person' : 'People'} going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {appusers.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username }>
                            {attendee.username === host?.username &&
                            <Label
                                style={{ position: 'absolute' }}
                                color='orange'
                                ribbon='right'
                            >
                                Host
                            </Label>}
                            <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName }</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}                 
                </List>
            </Segment>
        </>

    )
})
