import { Button, Stack, Text, Image, useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faCalendarDays, faComments, faShieldDog, faDog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const navigate = useNavigate()
    return (
        <Stack gap={10} p='7' direction={"row"} height={'3em'} justifyContent={'space-between'} alignItems={'center'} bg={useColorModeValue('gray.50', 'gray.900')}>
            <Button transform={'scaleX(-1)'} colorScheme={'blue'} variant={'unstyled'} onClick={() => navigate('/')}><Image height={'100%'} src="src\assets\windoge.png"></Image></Button>
            <Stack direction={'row'} gap={10}>
            <Button leftIcon={<FontAwesomeIcon icon={faPerson} />} onClick={() => navigate('/patients')} variant={'unstyled'}>Patients</Button>
            <Button leftIcon={<FontAwesomeIcon icon={faCalendarDays} />} onClick={() => navigate('/planning')} variant={'unstyled'}>Planning</Button>
            <Button leftIcon={<FontAwesomeIcon icon={faComments} />} onClick={() => navigate('/messages')} variant={'unstyled'}>Messages</Button>
            </Stack>
            <IconButton onClick={toggleColorMode} icon={useColorModeValue(<FontAwesomeIcon icon={faMoon}/>, <FontAwesomeIcon icon={faSun}/>)}>
            </IconButton>
        </Stack>
    )
}

export default Header;