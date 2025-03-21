
import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import './ScheduleCreationMenuWarningsField.css';

const ScheduleCreationMenuWarningsField = ({text}) => {
    return (
        <Form>
            <TextArea placeholder={text} />
        </Form>
    );
}

export default ScheduleCreationMenuWarningsField;