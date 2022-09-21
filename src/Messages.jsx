import { Text, Badge, Stack, Center, Box, Button, Input, Spinner, IconButton, Tooltip, LinkBox } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Message from "./Message";
import Destinataire from "./Destinataire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faFolderOpen, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Messages = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    // l'ID du médecin Tina
    const refMedecin = "7"
    // le patient élu (le médecin a cliqué sur lui), il change à chaque séléction
    const [chosen, setChosen] = useState("62f65031c87c9100196ec0a5")
    const [receivedMessages, setReceivedMessages] = useState(null);
    const [sentMessages, setSentMessages] = useState(null)
    const [allMessages, setAllMessages] = useState(null);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [fetchingMessages, setFetchingMessages] = useState(false);

    const handleClick = async () => {
        setSendingMessage(true)
        try {
            const rawResponse = await fetch('https://fhir.alliance4u.io/api/communication', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        resourceType: "Communication",
                        sent: new Date(),
                        sender: {
                            reference: `Practitioner/${refMedecin}`,
                        },
                        recipient: [{ reference: `Patient/${chosen}` }],
                        payload: [{ contentString: inputRef.current.value }]
                    }
                )
            });
            inputRef.current.value = "";
            loadMessages();
            setSendingMessage(false)
        } catch (error) {
            setSendingMessage(false)
        }

    }

    const handlePatientClick = async () => {
        setSendingMessage(true)
        try {
            const rawResponse = await fetch('https://fhir.alliance4u.io/api/communication', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        resourceType: "Communication",
                        sent: new Date(),
                        sender: {
                            reference: `Patient/${chosen}`,
                        },
                        recipient: [{ reference: `Practitioner/${refMedecin}` }],
                        payload: [{ contentString: inputRef.current.value }]
                    }
                )
            });
            inputRef.current.value = "";
            loadMessages();
            setSendingMessage(false)
        } catch (error) {
            setSendingMessage(false)
        }
    }

    useEffect(() => {
        loadMessages();
    }, [chosen])

    useEffect(() => {
        if (sentMessages || receivedMessages) {
            let mergedArray = sentMessages?.concat(receivedMessages);
            mergedArray?.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return Date.parse(b.sent) - Date.parse(a.sent);
            });
            setAllMessages(mergedArray);
        }
    }, [sentMessages, receivedMessages])

    const loadMessages = async () => {
        setFetchingMessages(true)
        await fetch(`https://fhir.alliance4u.io/api/communication?sender.reference=Patient/${chosen}&recipient.reference=Practitioner/${refMedecin}`)
            .then(response => response.json())
            .then(data => setReceivedMessages(data));

        await fetch(`https://fhir.alliance4u.io/api/communication?sender.reference=Practitioner/${refMedecin}&recipient.reference=Patient/${chosen}`)
            .then(response => response.json())
            .then(data => setSentMessages(data));
        setFetchingMessages(false)
    }

    // const createPatient = async () => {
    //     const rawResponse = await fetch('https://fhir.alliance4u.io/api/patient', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(
    //             {
    //                 resourceType: "Patient",
    //                 name: [
    //                     {
    //                         family: "Pat",
    //                         given: [
    //                             "Patrouille"
    //                         ]
    //                     },
    //                 ],
    //                 generalPractitioner: [
    //                     {
    //                         reference: "6321e0f8d83022001917f14b",
    //                         type: "Practitioner"
    //                     }
    //                 ],
    //                 gender: "male",
    //                 birthDate: "2000-12-19",
    //             }
    //         )
    //     })
    // }

    return (
        <>
            <Stack className="customHeight1" direction="row">
                <Destinataire onSelection={setChosen} />
                <Stack flexGrow={1}>
                    <Box boxShadow={'0 4px 10px -9px gray'} marginLeft={'-0.5rem'} p='2' borderBottom={'1px solid'} borderColor='gray.300' display={'flex'} flexDirection='row'>
                        <Text>Patient's reference is #{chosen}</Text>
                        <Tooltip bg={'verdigris.500'} placement="bottom" label="Open patient's folder">
                            <IconButton onClick={() => navigate({ pathname: "/dossier", search: createSearchParams({ ref: chosen }).toString() })} colorScheme={'verdigris'} marginLeft={'2'} size={'xs'} icon={<FontAwesomeIcon icon={faFolderOpen} />} />
                        </Tooltip>
                    </Box>
                    <Stack className="customHeight2" px='4' direction={'column-reverse'} overflowY='scroll'>

                        <Tooltip bg={'blue.500'} placement="top" label='Load new messages'>
                            <IconButton icon={<FontAwesomeIcon icon={faRotateRight} />} onClick={loadMessages} isLoading={fetchingMessages} alignSelf={'center'} colorScheme='blue' rounded={'full'} p='2' size={'sm'} variant={'solid'}></IconButton>
                        </Tooltip>
                        {
                            allMessages?.map((element, index) => {
                                return <Message key={index} alignement={element?.sender?.reference.includes("Practitioner") ? "end" : "start"} content={element?.payload[0].contentString} />
                            })
                        }
                    </Stack>

                    <Stack p='4' paddingTop={0} h={'50px'} direction={'row'} align={'center'}>
                        <Input ref={inputRef} placeholder='Aa'></Input>
                        <Button rightIcon={<FontAwesomeIcon icon={faPaperPlane}/>} isLoading={sendingMessage} colorScheme={'green'} onClick={handleClick}>Médecin</Button>
                        <Button isLoading={sendingMessage} variant='outline' colorScheme={'green'} onClick={handlePatientClick}>Patient (test)</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>

    )
}

export default Messages;