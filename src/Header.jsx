import { Button, Stack, Text } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faCalendarDays, faComments } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const navigate = useNavigate()
    return (
        <Stack gap={10} direction={"row"} height={'3em'} alignItems={'center'} justifyContent={'center'}>
            <Button leftIcon={<FontAwesomeIcon icon={faPerson}/>} onClick={() => navigate('/patients')} variant={'ghost'}>PATIENTS</Button>
            <Button leftIcon={<FontAwesomeIcon icon={faCalendarDays}/>} onClick={() => navigate('/planning')} variant={'ghost'}>PLANNING</Button>
            <Button leftIcon={<FontAwesomeIcon icon={faComments}/>} onClick={() => navigate('/messages')} variant={'ghost'}>MESSAGES</Button>
        </Stack>
    )
}

export default Header;