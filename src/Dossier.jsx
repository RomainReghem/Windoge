import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Button, Center, Divider, Heading, IconButton, Input, Stack, Text, Textarea, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, useColorModeValue
} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Dossier = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("Firstname Lastname");
    const [infos, setInfos] = useState({
        gender: "N/A",
        dateOfBirth: "N/A",
        address: "N/A",
        phone: "N/A",
        mail: "N/A"
    })
    const [data, setData] = useState();
    const [observations, setObservations] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()


    // l'ID du médecin Tina
    const refMedecin = "7"

    const [obsText, setObsText] = useState("");
    const [obsValue, setObsValue] = useState(0);
    const [obsUnit, setObsUnit] = useState("");

    useEffect(() => {
        fetch(`https://fhir.alliance4u.io/api/patient`)
            .then(response => response.json())
            .then(data => setData(data.filter(element => element.id == searchParams.get('ref'))[0]));

        loadObservations();
    }, [])

    useEffect(() => {
        if (data?.name) {
            try {
                setName(`${data.name[0].given} ${data.name[0].family}`)
            } catch (error) { }
        }
        data?.gender && setInfos(prevState => ({
            ...prevState,
            gender: data.gender
        }))

        data?.birthDate && setInfos(prevState => ({
            ...prevState,
            dateOfBirth: data.birthDate
        }))


        data?.telecom?.map((element, index) => {
            if (element.system && element.system == "phone" && element.value) {
                setInfos(prevState => ({
                    ...prevState,
                    phone: element.value
                }))
            } else if (element.system && element.system == "email" && element.value) {
                setInfos(prevState => ({
                    ...prevState,
                    mail: element.value
                }))
            }
        })

        try {
            if (data?.address && data?.address[0] && data?.address[0].city && data?.address[0].city) {
                setInfos(prevState => ({
                    ...prevState,
                    address: `${data.address[0].city}, ${data.address[0].country}`
                }))
            }
        } catch (error) {

        }
    }, [data])

    const loadObservations = () => {
        fetch(`https://fhir.alliance4u.io/api/observation?subject.reference=Patient/${searchParams?.get("ref")}`)
            .then(response => response.json())
            .then(data => setObservations(data));
    }

    const handleSendObservation = async () => {
        if (obsText) {
            try {
                const rawResponse = await fetch('https://fhir.alliance4u.io/api/observation', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            resourceType: "Observation",
                            code: {
                                coding: [
                                    {
                                        display: obsText,
                                    }
                                ]
                            },
                            subject: {
                                reference: `Patient/${searchParams?.get("ref")}`,
                                display: name
                            },
                            issued: new Date(),
                            performer: [
                                {
                                    reference: `Practitioner/${refMedecin}`,
                                    display: "Dr Tina Nomena Nantenaina"
                                }
                            ],
                            valueQuantity: {
                                value: parseInt(obsValue),
                                unit: obsUnit && obsUnit,
                            },
                        }
                    )
                });
                console.log(rawResponse)
                loadObservations();
            }
            catch (error) {
                console.log("erreur d'envoi d'observation")
            }
        }
    }

    return (
        <>
        <IconButton icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={() => navigate(-1)} w={'40px'} m={2} marginBottom={5}></IconButton>
            <Center p={6} flexDirection={'column'} flexGrow={1}>
                <Stack w={['xs', 'lg']} gap={2}>
                    <Stack alignItems={'center'}>
                        <Tooltip placement="top" label={`Patient's ref : ${searchParams?.get("ref")}`}>
                            <Heading>{name}</Heading>
                        </Tooltip>
                    </Stack>

                    <Divider></Divider>

                    <Stack>
                        <Stack>
                            <Heading fontSize={'xl'}>Informations</Heading>
                            <Text>Gender : {infos.gender}</Text>
                            <Text>Date of birth : {infos.dateOfBirth}</Text>
                            <Text>Adress : {infos.address}</Text>
                            <Text>Phone : {infos.phone}</Text>
                            <Text>Email : {infos.mail}</Text>
                        </Stack>

                        <Divider></Divider>

                        <Stack gap={2}>
                            <Stack direction={'row'}>
                                <Heading fontSize={'xl'}>Observations</Heading>
                                <Tooltip bg={'green.500'} placement="right" label="New observation">
                                    <IconButton onClick={onOpen} colorScheme={'green'} size={'xs'} icon={<FontAwesomeIcon icon={faPlus} />} />
                                </Tooltip>
                            </Stack>

                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Create an observation</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                    <Stack>
                                        <Textarea onChange={(e) => { setObsText(e.target.value) }} placeholder="Description de l'observation">
                                        </Textarea>
                                        <Stack direction={'row'}>
                                            <Input placeholder="valeur" type={'number'} onChange={(e) => { setObsValue(e.target.value) }}></Input>
                                            <Input placeholder='unité' onChange={(e) => { setObsUnit(e.target.value) }}></Input>
                                        </Stack>
                                    </Stack></ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='red' mr={3} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button onClick={() => { handleSendObservation(); onClose() }} colorScheme={'green'}>Send</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            <Accordion allowToggle>
                                {
                                    observations?.map((element, index) => {
                                        try {
                                            return (
                                                <AccordionItem key={index}>
                                                    <Heading>
                                                        <AccordionButton bg={useColorModeValue('celadon.50', 'gray.700')} _hover={{ backgroundColor: useColorModeValue('celadon.100', 'gray.600') }}>
                                                            <Box flex='1' textAlign='left' fontFamily={'body'}>
                                                                Observation {index + 1} {element?.performer?.map((e) => `par ${e.display}`)}
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
                                            console.error(error)
                                        }

                                    })
                                }
                            </Accordion>
                        </Stack>
                    </Stack>

                </Stack>
            </Center>

        </>

    )
}

export default Dossier;