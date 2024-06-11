import React, { useEffect, useRef } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import '../../Styles/Scheduler.css';

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
        schedulerInstance.config.hour_date = timeFormatState ? '%H:%i' : '%g:%i %A'; // Use 24-hour or 12-hour format
        schedulerInstance.xy.scale_width = 70;

        // Set time range from 9:00 AM to 6:00 PM
        schedulerInstance.config.first_hour = 9;
        schedulerInstance.config.last_hour = 18;

        // Configure the time step to 30 minutes
        schedulerInstance.config.time_step = 30;

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

        // Set lightbox time range
        schedulerInstance.config.lightbox.sections = [
            { name: "description", height: 50, map_to: "text", type: "textarea", focus: true },
            { name: "time", height: 72, type: "time", map_to: "auto" }
        ];

        // Customize the time select options
        schedulerInstance.attachEvent("onLightbox", function(id) {
            const ev = schedulerInstance.getEvent(id);
            ev.start_date.setHours(Math.max(9, Math.min(18, ev.start_date.getHours())));
            ev.end_date.setHours(Math.max(9, Math.min(18, ev.end_date.getHours())));
            schedulerInstance.updateEvent(id);
        });

        // Clean up
        return () => {
            schedulerInstance.clearAll();
        };
    }, [events, onDataUpdated]);

    useEffect(() => {
        const schedulerInstance = window.scheduler;
        schedulerInstance.config.hour_date = timeFormatState ? '%H:%i' : '%g:%i %A';
        schedulerInstance.templates.hour_scale = schedulerInstance.date.date_to_str(schedulerInstance.config.hour_date);
        schedulerInstance.render();
    }, [timeFormatState]);

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
