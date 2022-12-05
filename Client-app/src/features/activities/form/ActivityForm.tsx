import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity => setActivity(activity!))
    }, [id, activityStore.loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            activityStore.createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            activityStore.updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({...activity, [name]: value})
    }

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activity....'/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit } autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={ handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={activityStore.loading} floated='right' positive type='submit' content='Submit' onChange={handleInputChange} />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' onChange={handleInputChange} />
            </Form>
        </Segment>
    )
})