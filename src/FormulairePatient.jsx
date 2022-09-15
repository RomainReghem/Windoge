import { Text, Center, Badge, Stack, InputLeftElement, InputGroup, Input, Button, Spinner, FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { HStack, RadioGroup, Radio, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";

const FormulairePatient = () => {
    const navigate = useNavigate()

    return (
        <>
        
           <IconButton icon={<FontAwesomeIcon icon={faArrowLeft}/>} onClick={() => navigate(-1)} w={'40px'} m={2}></IconButton> 
        
        
        
            <FormControl m={[2, 3]} w='xl'>
                <HStack>
                    <Stack>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' />
                    </Stack>
                    <Stack>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' />
                    </Stack>
                </HStack>
                <FormLabel>Gender</FormLabel>
                <RadioGroup defaultValue='Male'>
                    <HStack>
                        <Radio value='Male'>Male</Radio>
                        <Radio value='Female'>Female</Radio>
                    </HStack>
                </RadioGroup>

                <HStack>
                    <Stack>
                        <FormLabel>Date of Birth</FormLabel>
                    <Input type='date' />
                    </Stack>
                    
                    <Stack>
                      <FormLabel>Place of Birth</FormLabel>
                    <Input type='text' />  
                    </Stack>
                    
                </HStack>


                <FormLabel>Address</FormLabel>
                <Input type='text' />
                <Stack>
                    <FormLabel>Contact</FormLabel>
                    <HStack>
                        <Input type='tel' placeholder='Phone Number' />
                        <Input type='email' placeholder='Email' />
                    </HStack>
                </Stack>
            </FormControl>


        </>
    )
}

export default FormulairePatient;