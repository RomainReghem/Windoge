import { Divider, IconButton, Stack, Text, Box, Heading } from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'


const Patient = () => {
    return (
        <>
            <Stack p='4' w={'40%'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Heading fontSize={'2xl'}>Patrick Balkany</Heading>
                    <IconButton colorScheme={'blue'} size={'sm'} icon={<FontAwesomeIcon icon={faPenToSquare} />}></IconButton>
                </Stack>
                <Divider></Divider>
                <Stack>
                    <Text>Male</Text>
                    <Text>25/12/1974 (23 ans)</Text>
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