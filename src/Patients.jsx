import { Text, Center, Badge, Stack, InputLeftElement, InputGroup, Input, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

import Patient from "./Patient"

const Patients = () => {
    return (
        <Center flexDirection={'column'} flexGrow='1' gap='4' px='4' py={8} >
            <Stack w='40%' direction={'row'}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                />
                <Input type='tel' placeholder='Rechercher un patient...' />
            </InputGroup>
            <Button colorScheme={'green'} leftIcon={<FontAwesomeIcon icon={faPlus}/>}>Patient</Button>
            </Stack>
            <Patient />
            <Patient />
            <Patient />
            {/* <Stack align={'center'}>
            <Text>
                Page
            </Text>
            <Badge colorScheme='purple'>dossiers patients</Badge>
            </Stack> */}
        </Center>

    )
}

export default Patients;