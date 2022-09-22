import { Text, Badge, Stack, Center, Flex } from "@chakra-ui/react";
import Calendar from "./Calendar";
import DemandeRDV from "./DemandeRDV";


const Planning = () => {
    return (
        <>
            <Center gap={10}>
                <Stack maxW={'sm'}>
                    <DemandeRDV />
                </Stack>
                <Stack maxW={'70%'}>
                    <Calendar />
                </Stack>
            </Center>

        </>

    )
}

export default Planning;