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
                    <DropdownMenu className = "dropdown">
                        <DropdownItem><b>Name:</b> {patient.name}</DropdownItem>
                        <DropdownItem><b>Temp:</b> {patient.temperature}</DropdownItem>
                        <DropdownItem><b>Pulse:</b> {patient.pulse}</DropdownItem>
                        <DropdownItem><b>Resp:</b> {patient.respiration}</DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </div>
        )
    }
}

export default Patient;