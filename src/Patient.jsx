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

    useEffect(() => {
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
                    <AccordionItem>
                        <Heading>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Observation 1
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <Heading>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Observation 2
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Stack>
        </>
    )
}
export default Patient;