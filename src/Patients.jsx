import { Text, Center, Badge, Stack, InputLeftElement, InputGroup, Input, Button, Spinner, Checkbox } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

import Patient from "./Patient"
import { useEffect, useState } from "react";

const Patients = () => {
    const [data, setData] = useState(null)
    const [research, setResearch] = useState("")
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [url, setUrl] = useState("https://fhir.alliance4u.io/api/Patient");

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data));
    }, [url])

    const handleChange = e => {
        setResearch(e.target.value.toUpperCase())
    }

    const onlyMyPatients = (checked) => {
        console.log(checked)
        checked 
        ? setUrl("https://fhir.alliance4u.io/api/Patient?generalPractitioner.reference=6321e0f8d83022001917f14b") 
        : setUrl("https://fhir.alliance4u.io/api/Patient")
    }


    return (
        <Stack alignItems={'center'} flexDirection={'column'} flexGrow='1' gap='4' px='4' py={8} >
            <Stack w={{ base: 'xs', md: 'xl' }} direction={'row'}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    />
                    <Input onChange={handleChange} type='tel' placeholder='Rechercher un patient...' />
                </InputGroup>
                <Button colorScheme={'green'} leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => navigate('/formulairepatient')}>Patient</Button>
            </Stack>
            <Stack spacing={5} direction='row'>
                <Checkbox colorScheme='green' onChange={(e) => {onlyMyPatients(e.target.checked)}}>
                    My patients
                </Checkbox>
            </Stack>
            {
                !data && <Spinner />
            }
            {
                Array.isArray(data) && data?.map((element, index) => {
                    if (element.name) {
                        if (!research || element.name[0].family?.toUpperCase().includes(research) || element.name[0].given?.join().toUpperCase().includes(research)) {
                            return (
                                <Patient key={index} infos={element} highlight={research} />
                            )
                        }
                    }
                })
            }
        </Stack>

    )
}

export default Patients;