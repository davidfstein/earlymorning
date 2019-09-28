import React from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

class Patient extends React.Component {

    render() {
        const patient = this.props.patient;
        const backgroundColor = this.props.color;
        return (
            <div className="patient-button" style={{backgroundColor: backgroundColor}}>
                <UncontrolledButtonDropdown className="patient-button-name">
                    <DropdownToggle>
                        {patient.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>{patient.name}</DropdownItem>
                        <DropdownItem>{patient.temperature}</DropdownItem>
                        <DropdownItem>{patient.pulse}</DropdownItem>
                        <DropdownItem>{patient.respiration}</DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </div>
        )
    }
}

export default Patient;