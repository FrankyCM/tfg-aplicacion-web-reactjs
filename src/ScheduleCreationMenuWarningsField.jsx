import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import './ScheduleCreationMenuWarningsField.css';

const ScheduleCreationMenuWarningsField = ({text}) => {
    return (
        <Form>
            <TextArea className="areaTextoInformativo" placeholder={text} readOnly style={{ resize: 'both' }} />
        </Form>
    );
}

export default ScheduleCreationMenuWarningsField;