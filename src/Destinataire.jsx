import { Button, Divider, Heading, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const Destinataire = (props) => {
    const [patients, setPatients] = useState(null);
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        fetch(' https://fhir.alliance4u.io/api/Patient?generalPractitioner.reference=Practitioner/7')
            .then(response => response.json())
            .then(data => setPatients(data));
    }, [])

    const handleSelectPatient = (id) => {
        props.onSelection(id)
    }

    return (
        <Stack w={'2xs'} borderRight={'1px solid'} borderColor='gray.300' p={'4'} overflow='auto'>
            <Heading fontSize={'xl'}>Your patients</Heading>
            <Divider></Divider>
            {
                patients?.map((element, index) => {
                    if (element.name) {
                        return (
                            <Button onClick={() => { handleSelectPatient(element.id); setSelected(index) }} variant={index == selected ? 'solid' : 'outline'} key={index} p='4' colorScheme={'gray'} cursor={'pointer'}>
                                <Text>{element.name[0].given} {element.name[0].family} </Text>
                            </Button>
                        )

                    }
                })
            }
        </Stack>

    )
}

export default Destinataire;