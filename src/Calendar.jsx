import { Text, Badge, Stack, Center } from "@chakra-ui/react";
import { ScheduleComponent, Inject, Day, Week, Month, WorkWeek,Agenda, MonthAgenda, TimelineViews, TimelineMonth} from '@syncfusion/ej2-react-schedule';
import './Calendar.css'


const Calendar = () => {
    return(
        <>
        
            <Stack align={'center'}>
            <ScheduleComponent >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} />
            </ScheduleComponent>
            
            </Stack>
        </>

    )
}

export default Calendar;