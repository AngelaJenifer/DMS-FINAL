import React, { useEffect, useRef } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import '../../Styles/Scheduler.css'

const Scheduler = ({ events, onDataUpdated, timeFormatState }) => {
    const schedulerContainerRef = useRef(null);

    useEffect(() => {
        const schedulerInstance = window.scheduler;

        schedulerInstance.skin = 'material';
        schedulerInstance.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        schedulerInstance.config.hour_date = '%g:%i %A'; // %A displays AM/PM
        schedulerInstance.xy.scale_width = 70;

       


        const initSchedulerEvents = () => {
            if (!schedulerInstance._$initialized) {
                schedulerInstance.attachEvent('onEventAdded', (id, ev) => {
                    if (onDataUpdated) {
                        onDataUpdated('create', ev, id);
                        const allEvents = schedulerInstance.getEvents(); // Retrieve all events
                        saveEventsToStorage(allEvents); // Save events to localStorage
                    }
                });
                
                schedulerInstance.attachEvent('onEventChanged', (id, ev) => {
                    if (onDataUpdated) {
                        onDataUpdated('update', ev, id);
                        const allEvents = schedulerInstance.getEvents(); // Retrieve all events
                        saveEventsToStorage(allEvents); // Save events to localStorage
                    }
                });
                
                schedulerInstance.attachEvent('onEventDeleted', (id, ev) => {
                    if (onDataUpdated) {
                        onDataUpdated('delete', ev, id);
                        const allEvents = schedulerInstance.getEvents(); // Retrieve all events
                        saveEventsToStorage(allEvents); // Save events to localStorage
                    }
                });
                

                schedulerInstance._$initialized = true;
            }
        };

        initSchedulerEvents();

        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            schedulerInstance.parse(JSON.parse(storedEvents));
        } else {
            schedulerInstance.parse(events);
        }

        schedulerInstance.init(
            schedulerContainerRef.current,
            new Date()
        );

        // Handle navigation events
        schedulerInstance.attachEvent('onBeforeViewChange', (oldMode, oldDate, mode, date) => {
            console.log('View change:', mode, date);
            return true; // Allow view change to proceed
        });

        schedulerInstance.init(schedulerContainerRef.current, new Date(), 'day'); // Set the default view to day

        // Clean up
        return () => {
            schedulerInstance.clearAll();
        };
    }, [events, onDataUpdated]);

    useEffect(() => {
        const schedulerInstance = window.scheduler;
        schedulerInstance.render();
    }, [timeFormatState]);

    const setTimeFormat = (state) => {
        const schedulerInstance = window.scheduler;
        schedulerInstance.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        schedulerInstance.templates.hour_scale = schedulerInstance.date.date_to_str(
            schedulerInstance.config.hour_date
        );
    };

    setTimeFormat(timeFormatState);

    const saveEventsToStorage = (events) => {
        localStorage.setItem('events', JSON.stringify(events));
    };
    

    return (
        <div
            ref={schedulerContainerRef}
            style={{ width: '90%', height: '100%' }}
        ></div>
    );
};

export default Scheduler;
