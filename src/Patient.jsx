import { Divider, IconButton, Stack, Text, Box, Heading, Highlight, Tooltip, Badge, Tag } from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,useColorModeValue
} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";


const Patient = ({ infos, highlight }) => {

    const [name, setName] = useState("Unknown");
    const [gender, setGender] = useState("Unknown gender");
    const [birth, setBirth] = useState(null);
    const [observations, setObservations] = useState(null);
    const [appointments, setAppointments] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (infos.id) {
            fetch(`https://fhir.alliance4u.io/api/observation?subject.reference=Patient/${infos.id}`)
                .then(response => response.json())
                .then(data => setObservations(data));
            fetch(`https://fhir.alliance4u.io/api/appointment?participant.actor.identifier.value=${infos.id}`)
                .then(response => response.json())
                .then(data => setAppointments(data));
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
            <Stack p='4' w={{ base: 'xs', md: 'xl' }} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Heading fontSize={'2xl'}>
                        {highlight == "" ? name
                            :
                            <Highlight query={highlight} styles={{ px: '0.2', py: '1', bg: 'tan.100' }}>
                                {name}
                            </Highlight>
                        }
                    </Heading>
                    <Tooltip bg={'verdigris.500'} placement="right" label="Open patient's folder">
                        <IconButton onClick={() => navigate({ pathname: "/dossier", search: createSearchParams({ ref: infos?.id }).toString() })} colorScheme={'verdigris'} size={'sm'} icon={<FontAwesomeIcon icon={faFolderOpen} />}></IconButton>
                    </Tooltip>
                </Stack>
                <Divider></Divider>
                <Stack>
                    {birth && <Text>Born on {birth}</Text>}
                    
                    {observations?.length > 0 ?

                        <Tag>{observations?.length} observations on patient's folder</Tag> : <Tag>No observations yet</Tag>}
                </Stack>
                <Accordion allowToggle>
                    {
                        appointments?.map((element, index) => {
                            try {
                                return (
                                    Date.parse(element.end) > Date.parse(new Date()) &&
                                    <AccordionItem key={index}>
                                        <Heading>
                                            <AccordionButton bg={useColorModeValue('celadon.50', 'gray.700')} _hover={{ backgroundColor: useColorModeValue('celadon.100', 'gray.600') }}>
                                                <Box flex='1' textAlign='left' fontFamily={'body'}>
                                                    Appointment ({element?.start && element.start.split("T")[0]})
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </Heading>
                                        <AccordionPanel pb={4}>
                                            {element.status && <Badge colorScheme={element.status == "booked" && "green"}>{element?.status}</Badge>}<br />
                                            Begins : {element?.start && element.start.split("T")[0]} at {element?.start && element.start.split("T")[1]}<br />
                                            Ends : {element?.end && element.end.split("T")[0]} at {element?.end && element.end.split("T")[1]}<br />
                                            Duration : {element?.minutesDuration && element?.minutesDuration} minutes
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