import { Divider, IconButton, Stack, Text, Box, Heading, Highlight } from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";


const Patient = ({ infos, highlight }) => {

    const [name, setName] = useState("Unknown");
    const [gender, setGender] = useState("Unknown gender");
    const [birth, setBirth] = useState("Unknown birth date");
    const [observations, setObservations] = useState(null);

    useEffect(() => {
        if (infos.id) {
            fetch(`https://fhir.alliance4u.io/api/observation?subject.reference=Patient/${infos.id}`)
                .then(response => response.json())
                .then(data => setObservations(data));
        }

        if (infos.name) {
            try {
                setName(`${infos.name[0].given} ${infos.name[0].family}`)
            } catch (error) {

            }
        }
        infos.birthDate && setBirth(infos.birthDate)
        infos.gender && setGender(infos.gender)

    }, [infos])
    return (
        <>
            <Stack p='4' w={'xl'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Heading fontSize={'2xl'}>
                        {highlight == "" ? name
                            :
                            <Highlight query={highlight} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                                {name}
                            </Highlight>
                        }
                    </Heading>
                    <IconButton colorScheme={'blue'} size={'sm'} icon={<FontAwesomeIcon icon={faPenToSquare} />}></IconButton>
                </Stack>
                <Divider></Divider>
                <Stack>
                    <Text>{gender}</Text>
                    <Text>{birth}</Text>
                </Stack>
                <Accordion allowToggle>
                    {
                        observations?.map((element, index) => {
                            try {
                                return (
                                <AccordionItem key={index}>
                                    <Heading>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                Observation {index+1} {element?.performer?.map((e) => `par ${e.display}`)}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </Heading>
                                    <AccordionPanel pb={4}>
                                        {element.code?.coding[0].display} : {element.valueQuantity?.value}{element.valueQuantity?.unit}

                                    </AccordionPanel>
                                </AccordionItem>
                            )
                            } catch (error) {
                                console.error("problème de formattage dans les observations")
                            }
                            

                        })
                    }

                </Accordion>
            </Stack>
        </>
    )
}
export default Patient;