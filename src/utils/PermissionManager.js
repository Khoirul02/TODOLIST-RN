/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
const PermissionManager = {
    PermissionCalendar: async () => {
        let status;
        const calendarPermission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CALENDARS
                : PERMISSIONS.ANDROID.WRITE_CALENDAR;
        const permissionStatus = await request(calendarPermission);
        if (permissionStatus === RESULTS.GRANTED) {
            status = true;
        } else {
            status = false;
        }
        return status;
    },
};

export default PermissionManager;
