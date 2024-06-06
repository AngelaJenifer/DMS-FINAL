import React, { Component } from 'react';
import Scheduler from '../UI/Scheduler.js';
import Nav from './Nav.jsx';

class Calendar extends Component {
    constructor(props) {
        super(props);
    
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDay();
        this.state = {
            currentTimeFormatState: true,
            messages: [],
            currentYear: currentYear,
            currentMonth: currentMonth,
            currentDay: currentDay,
            events: []  // Initialize events array
        };
    }
    

    componentDidMount() {
        this.fetchEventsForYear(this.state.currentYear); // Fetch events for the current year
    }

    fetchEventsForYear = (year) => {
        // Example: fetch data for the provided year and update the state
        const dataForCurrentYear = [
            { start_date:`${year}`, end_date:`${year}`, text:'Event 1', id: 1 },
            { start_date:`${year}`, end_date:`${year}`, text:'Event 2', id: 2 }
        ];

        this.setState({ events: dataForCurrentYear });
    }

    addMessage = (message) => {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = [
            newMessage,
            ...this.state.messages
        ];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({ messages });
    }

    logDataUpdate = (action, ev, id) => {
        const text = ev && ev.text ? ` (${ev.text})` : '';
        const message = `event ${action}: ${id} ${text}`;
        this.addMessage(message);
    }

    handleTimeFormatStateChange = (state) => {
        this.setState({
            currentTimeFormatState: state
        });
    }

    render() {
        const { currentTimeFormatState, events } = this.state;
        
        return (
            <>
            <Nav />
            <div>
                <div className='scheduler-container'>
                    <Scheduler
                        events={events}
                        timeFormatState={currentTimeFormatState}
                        onDataUpdated={this.logDataUpdate}
                    />
                </div>
            </div>
            </>
        );
    }
}

export default Calendar;
