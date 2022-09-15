import { Text, Badge, Stack, Center, Button, Input } from "@chakra-ui/react";
import { useRef } from "react";

const Messages = () => {
    const inputRef = useRef(null);

    const handleClick = async () => {
        const rawResponse = await fetch('https://fhir.alliance4u.io/api/communication', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { resourceType: "Communication", sent: new Date(), sender: { display: "Jean Jacques" }, recipient: [{ display: "Patrick" }], payload: [{ contentString: "Salut bonjour !" }] }
            )
        });
        const content = await rawResponse.json();

        console.log(content);
    }

    return (
        <>
            <Center h={'100%'}>
                <Stack align={'center'}>
                    <Text>
                        Page
                    </Text>
                    <Badge colorScheme='purple'>Messagerie</Badge>
                    <Input ref={inputRef}></Input>
                    <Button onClick={handleClick}>Envoyer</Button>
                </Stack>
            </Center>
        </>

    )
}

export default Messages;