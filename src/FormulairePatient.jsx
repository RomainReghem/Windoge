import { Text, Center, Badge, Stack, InputLeftElement, InputGroup, Input, Button, Spinner, FormControl, FormLabel, FormErrorMessage, FormHelperText, Divider, Heading } from "@chakra-ui/react";
import { HStack, RadioGroup, Radio, IconButton, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

const FormulairePatient = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [birthDate, setBirthDate] = useState();
    const [address, setAddress]=useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://fhir.alliance4u.io/api/patient", {
            method: "POST",
            headers: { 'Accept': 'application/json','Content-Type':'application/json' },
            body: JSON.stringify({
                resourceType:"Patient",
                name:[{use:"official",family:lastName,given:[firstName]}],
                telecom:[{use:"home",system:"phone",value:phoneNumber},{use:"home",system:"email",value:email}],
                gender:gender,
                birthDate:birthDate,
                address:[{use:"home",text:address}],
                generalPractitioner:[{reference:"Practitioner/7"}]
            })});
            
            console.log(res)
                
          let resJson = await res.json();
          if (res.status === 200) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setAddress("")
            setBirthDate("")
            setGender("male")
            setPhoneNumber("")
            
           toast({
                title: 'You successfully created a patient',
                description: "The patient is added to your patient list",
                status: 'success',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            }); 
            navigate('/patients')
          } else {
            toast({
                title: 'An error occured',
                description: "The patient could not be created",
                status: 'failure',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            });
          }
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <>
            <Center h={'100%'} flexDirection='column' p='4'>
                <Heading marginBottom={5}> Create a new Windoge patient's folder </Heading>
                
                    <FormControl m={[2, 3]} w='xl'>
                        <HStack marginBottom='2'>
                            <Stack>
                              <FormLabel my={0}>First Name</FormLabel>
                              <Input type='text' onChange={(e) => setFirstName(e.target.value)} />  
                            </Stack>
                            <Stack>
                              <FormLabel my={0}>Last Name</FormLabel>
                              <Input type='text' onChange={(e) => setLastName(e.target.value)} />  
                            </Stack>
                        </HStack>

                        <FormLabel>Gender</FormLabel>
                        <RadioGroup defaultValue='male'>
                            <HStack marginBottom='5' spacing={10} direction='row' onChange={(e) => setGender(e.target.value)} >
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                                <Radio value='other'>Other</Radio>
                                <Radio value='unknown'>Unknown</Radio>
                            </HStack>
                        </RadioGroup>

                        <HStack marginBottom='3'>
                            <Stack>
                                <FormLabel my={0}>Date of Birth</FormLabel>
                                <Input type='date' onChange={(e) => setBirthDate(e.target.value)} />
                            </Stack>
                        </HStack>

                        <Stack marginBottom='3'>
                            <FormLabel my={0}>Address</FormLabel>
                            <Input type='text' onChange={(e) => setAddress(e.target.value)} />
                        </Stack>
                        <Stack>
                            <FormLabel my={0}>Contact</FormLabel>
                            <HStack>
                                <Input type='tel' placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} />
                                <Input type='email' placeholder='Email'onChange={(e) => setEmail(e.target.value)}  />
                            </HStack>
                        </Stack>
                    </FormControl>
                    <Button type='submit' colorScheme={"green"} onClick={handleSubmit}>Submit</Button>
                
                    
                

            </Center>

        </>
    )


    


}

export default FormulairePatient;