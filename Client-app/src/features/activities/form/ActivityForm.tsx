import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import { ActivityFormValues } from '../../../app/models/activity';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('This field is required'),
        description: Yup.string().required('This field is required'),
        category: Yup.string().required('This field is required'),
        date: Yup.string().required('This field is required').nullable(),
        venue: Yup.string().required('This field is required'),
        city: Yup.string().required('This field is required'),
    })

    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, activityStore.loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            activityStore.createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            activityStore.updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    //function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //    const { name, value } = event.target;
    //    setActivity({...activity, [name]: value})
    //}

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activity....'/>

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik
                enableReinitialize
                validationSchema={validationSchema }
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty}: any) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title'/>
                        
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions } placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                    )}
            </Formik>   
        </Segment>
    )
})