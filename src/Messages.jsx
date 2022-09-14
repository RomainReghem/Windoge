import { Text, Badge, Stack, Center } from "@chakra-ui/react";

const Messages = () => {
    return(
        <>
        <Center h={'100%'}>
            <Stack align={'center'}>
            <Text>
                Page
            </Text>
            <Badge colorScheme='purple'>Messagerie</Badge>
            </Stack>
        </Center>
        </>

    )
}

export default Messages;