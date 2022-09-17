import { Button, Divider, Heading, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const Destinataire = (props) => {
    const [patients, setPatients] = useState(null);
    const [selected, setSelected] = useState(667)

    useEffect(() => {
        fetch(' https://fhir.alliance4u.io/api/Patient?generalPractitioner.reference=6321e0f8d83022001917f14b')
            .then(response => response.json())
            .then(data => setPatients(data));
    }, [])

    const handleSelectPatient = (id) => {
        props.onSelection(id)
    }

    return (
        <Stack w={'2xs'} borderRight={'1px solid'} borderColor='gray.200' p={'4'} overflow='scroll'>
            <Heading fontSize={'xl'}>Your patients</Heading>
            <Divider></Divider>
            <Button onClick={() => { handleSelectPatient("62f65031c87c9100196ec0a5"); setSelected(667) }} key={667} p='4' variant={667 == selected ? 'solid' : 'outline'} colorScheme={'gray'} cursor={'pointer'}>
                <Text>Monsieur Zinzin</Text>
            </Button>
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