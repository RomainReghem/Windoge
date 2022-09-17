import { Stack, Text } from "@chakra-ui/react";

const Message = ({alignement, content}) => {
    return (
        <>
            <Stack alignSelf={alignement} rounded={'2xl'} p='2' maxW='sm' bg={alignement == 'end' ? 'blue.200' : 'gray.200'}>
                <Text>{content}</Text>
            </Stack>
        </>
    )
}

export default Message;