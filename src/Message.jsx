import { Stack, Text } from "@chakra-ui/react";

const Message = ({alignement, content}) => {
    return (
        <>
            <Stack alignSelf={alignement} rounded={'xl'} px='4' py='2' maxW='sm' color={alignement == 'end' ? 'white' : 'black'} bg={alignement == 'end' ? 'celadon.400' : 'gray.200'}>
                <Text>{content}</Text>
            </Stack>
        </>
    )
}

export default Message;