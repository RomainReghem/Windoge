import { Text, Center, Badge, Stack, InputLeftElement, InputGroup, Input, Button, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

import Patient from "./Patient"
import { useEffect, useState } from "react";

const Patients = () => {
    const [data, setData] = useState(null)
    const [research, setResearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://fhir.alliance4u.io/api/patient')
            .then(response => response.json())
            .then(data => setData(data));
    }, [])

    const handleChange = e => {
        setResearch(e.target.value.toUpperCase())
    }

    return (
        <Stack alignItems={'center'} flexDirection={'column'} flexGrow='1' gap='4' px='4' py={8} >
            <Stack w={'xl'} direction={'row'}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    />
                    <Input onChange={handleChange} type='tel' placeholder='Rechercher un patient...' />
                </InputGroup>
                <Button colorScheme={'green'} leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => navigate('/formulairepatient')}>Patient</Button>
            </Stack>
            {
                !data && <Spinner />
            }
            {
                data?.map((element, index) => {
                    if (element.name) {
                        if(!research || element.name[0].family.toUpperCase().includes(research) || element.name[0].given.join().toUpperCase().includes(research)){
                           return (
                            <Patient key={index} infos={element} highlight={research} />
                        ) 
                        }                        
                    }
                })
            }
            {/* <Stack align={'center'}>
            <Text>
                Page
            </Text>
            <Badge colorScheme='purple'>dossiers patients</Badge>
            </Stack> */}
        </Stack>

    )
}

export default Patients;