import { Button, Stack, Text, Image } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faCalendarDays, faComments, faShieldDog, faDog } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const navigate = useNavigate()
    return (
        <Stack gap={10} p='7' direction={"row"} height={'3em'} alignItems={'center'} bg='gray.100'>
            <Button colorScheme={'blue'} variant={'unstyled'} onClick={() => navigate('/')}><Image height={'100%'} src="src\assets\windoge.png"></Image></Button>
            <Button leftIcon={<FontAwesomeIcon icon={faPerson}/>} onClick={() => navigate('/patients')} variant={'unstyled'}>Patients</Button>
            <Button leftIcon={<FontAwesomeIcon icon={faCalendarDays}/>} onClick={() => navigate('/planning')} variant={'unstyled'}>Planning</Button>
            <Button leftIcon={<FontAwesomeIcon icon={faComments}/>} onClick={() => navigate('/messages')} variant={'unstyled'}>Messages</Button>
        </Stack>
    )
}

export default Header;