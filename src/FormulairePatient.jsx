import { Text, Center, Badge, Stack, InputLeftElement, InputGroup, Input, Button, Spinner, FormControl, FormLabel, FormErrorMessage, FormHelperText, Divider, Heading } from "@chakra-ui/react";
import { HStack, RadioGroup, Radio, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";

const FormulairePatient = () => {
    const navigate = useNavigate()

    return (
        <>

            <IconButton icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={() => navigate(-1)} w={'40px'} m={2} marginBottom={5}></IconButton>
            <Center h={'100%'} flexDirection='column'>
            <Heading marginBottom={5}> Create a new Windoge patient's folder </Heading>
                <FormControl m={[2, 3]} w='xl'>
                        <Stack marginBottom='5'>
                            <FormLabel>First Name and Last Name</FormLabel>
                            <Input type='text' />
                        </Stack>

                    <FormLabel>Gender</FormLabel>
                    <RadioGroup defaultValue='Male'>
                        <HStack marginBottom='5' spacing={20} direction='row'>
                            <Radio value='Male'>Male</Radio>
                            <Radio value='Female'>Female</Radio>
                        </HStack>
                    </RadioGroup>

                    <HStack marginBottom='5'>
                        <Stack>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input type='date' />
                        </Stack>
                    </HStack>

                    <Stack marginBottom='5'>
                        <FormLabel>Address</FormLabel>
                        <Input type='text' />
                    </Stack>
                    <Stack>
                        <FormLabel>Contact</FormLabel>
                        <HStack>
                            <Input type='tel' placeholder='Phone Number' />
                            <Input type='email' placeholder='Email' />
                        </HStack>
                    </Stack>
                </FormControl>
                <Button type='submit' mt={10} colorScheme={'green'}
                >Submit</Button>
            </Center>

        </>
    )
}

export default FormulairePatient;