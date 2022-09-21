import { Text, Center, Badge, Stack, InputLeftElement, InputGroup, Input, Button, Spinner, FormControl, FormLabel, FormErrorMessage, FormHelperText, Divider, Heading } from "@chakra-ui/react";
import { HStack, RadioGroup, Radio, IconButton, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

const FormulairePatient = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const [name, setName] = useState("");
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
                name:[{use:"official",given:[name]}],
                telecom:[{use:"home",system:"phone",value:phoneNumber},{use:"home",system:"email",value:email}],
                gender:gender,
                birthDate:birthDate,
                address:[{use:"home",text:address}],
                generalPractitioner:[{reference:"Practitioner/7"}]
            })});
            
            console.log(res)
                
          let resJson = await res.json();
          if (res.status === 200) {
            setName("");
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
            <IconButton icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={() => navigate(-1)} w={'40px'} m={2} marginBottom={5}></IconButton>
            <Center h={'100%'} flexDirection='column'>
                <Heading marginBottom={5}> Create a new Windoge patient's folder </Heading>
                
                    <FormControl m={[2, 3]} w='xl'>
                        <Stack marginBottom='5'>
                            <FormLabel>First Name and Last Name</FormLabel>
                            <Input type='text' onChange={(e) => setName(e.target.value)} />
                        </Stack>

                        <FormLabel>Gender</FormLabel>
                        <RadioGroup defaultValue='male'>
                            <HStack marginBottom='5' spacing={10} direction='row' onChange={(e) => setGender(e.target.value)} >
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                                <Radio value='other'>Other</Radio>
                                <Radio value='unknown'>Unknown</Radio>
                            </HStack>
                        </RadioGroup>

                        <HStack marginBottom='5'>
                            <Stack>
                                <FormLabel>Date of Birth</FormLabel>
                                <Input type='date' onChange={(e) => setBirthDate(e.target.value)} />
                            </Stack>
                        </HStack>

                        <Stack marginBottom='5'>
                            <FormLabel>Address</FormLabel>
                            <Input type='text' onChange={(e) => setAddress(e.target.value)} />
                        </Stack>
                        <Stack>
                            <FormLabel>Contact</FormLabel>
                            <HStack>
                                <Input type='tel' placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} />
                                <Input type='email' placeholder='Email'onChange={(e) => setEmail(e.target.value)}  />
                            </HStack>
                        </Stack>
                    </FormControl>
                    <Button type='submit' mt={10} colorScheme={"green"} onClick={handleSubmit}>Submit</Button>
                
                    
                

            </Center>

        </>
    )


    


}

export default FormulairePatient;