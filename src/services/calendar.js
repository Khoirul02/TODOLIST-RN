/* eslint-disable prettier/prettier */
import * as AddCalendarEvent from 'react-native-add-calendar-event';
const sendToCalendar = async (data) => {
      const eventDetails = {
        title: data.title,
        startDate: data.date.toISOString(),
        endDate: data.dateEnd.toISOString(),
        location: data.location,
        notes: data.description,
      };
     AddCalendarEvent.presentEventCreatingDialog(eventDetails)
       .then((id) => {
         console.log('Event added to calendar with ID:', id);
         return 'Event added to calendar';
       })
       .catch(error => {
         console.error('Error adding event to calendar:', error);
         return `Error adding event to calendar: ${error}`;
       });
};

const CalendarServices = {sendToCalendar};

export default CalendarServices;
