import { Text, Badge, Stack, Center, Box, Button, Input, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

const Messages = () => {
    const inputRef = useRef(null);
    // l'ID du médecin Tina
    const refMedecin = "6321e0f8d83022001917f14b"
    // le patient élu (le médecin a cliqué sur lui), il change à chaque séléction
    const [chosen, setChosen] = useState("62f65031c87c9100196ec0a5")
    const [receivedMessages, setReceivedMessages] = useState(null);
    const [sentMessages, setSentMessages] = useState(null)
    const [allMessages, setAllMessages] = useState(null);
    const [sendingMessage, setSendingMessage] = useState(false);

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

    const handleTestClick = async () => {
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
    }, [])

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

    const loadMessages = () => {
        //  https://fhir.alliance4u.io/api/communication?sender.reference=Patient/62f65031c87c9100196ec0a5
        fetch(`https://fhir.alliance4u.io/api/communication?sender.reference=Patient/${chosen}&recipient.reference=Practitioner/${refMedecin}`)
            .then(response => response.json())
            .then(data => setReceivedMessages(data));

        fetch(`https://fhir.alliance4u.io/api/communication?sender.reference=Practitioner/${refMedecin}&recipient.reference=Patient/${chosen}`)
            .then(response => response.json())
            .then(data => setSentMessages(data));
    }

    return (
        <>
            <Stack className="customH" direction="row">
                <Stack w={'2xs'} borderRight={'1px solid'} borderColor='gray.200'>

                </Stack>
                <Stack h={'100%'} flexGrow={1} p='4'>
                    <Stack className="customH" overflow='scroll' direction={'column-reverse'}>
                        {
                            allMessages?.map((element, index) => {
                                return <Message key={index} alignement={element?.sender?.reference.includes("Practitioner") ? "end" : "start"} content={element?.payload[0].contentString} />
                            })
                        }
                    </Stack>
                    <Stack h={'50px'} direction={'row'} align={'center'}>
                        <Input ref={inputRef} placeholder='Aa'></Input>
                        <Button isLoading={sendingMessage} colorScheme={'purple'} onClick={handleClick} noOfLines='1'>Envoyer (Médecin)</Button>
                        <Button isLoading={sendingMessage} colorScheme={'yellow'} onClick={handleTestClick} noOfLines='1'>Envoyer (Patient)</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>

    )
}

export default Messages;