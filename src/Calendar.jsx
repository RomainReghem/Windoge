import { Text, Badge, Stack, Center } from "@chakra-ui/react";
import { ScheduleComponent, Inject, Day, Week, Month, WorkWeek,Agenda, MonthAgenda, TimelineViews, TimelineMonth} from '@syncfusion/ej2-react-schedule';
import './Calendar.css'


const Calendar = () => {
    return(
        <>
        <Center h={'100%'}>
            <Stack align={'center'}>
            <ScheduleComponent width='75%' height='500px' >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} />
            </ScheduleComponent>
            
            </Stack>
        </Center>
        </>

    )
}

export default Calendar;