import { Center, Heading, Text, Stack, Input, Button, FormLabel, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const toast = useToast()
    const navigate = useNavigate()
    return (
        <>
            <Center h={'100%'} flexDirection='column' gap='20'>
                <Stack align={'center'}>
                    <Heading> Welcome to Windoge 5, your trusty link with your patients </Heading>
                </Stack>
                <Stack align={'center'} flexDirection='column' gap='5'>
                    <FormLabel> Username
                        <Input variant='filled' placeholder='Enter your username'></Input>
                    </FormLabel>
                    <FormLabel> Password
                        <Input variant='filled' placeholder='Enter your password'></Input>
                    </FormLabel>
                </Stack>
                <Stack>
                    <Button
                        onClick={() => {
                            toast({
                                title: 'You have successfully logged in',
                                description: "Welcome dear practician",
                                status: 'success',
                                duration: 9000,
                                position: 'top-right',
                                isClosable: true,
                            });
                            navigate('/patients')
                        }}
                    >
                        Log In
                    </Button>
                </Stack>
            </Center>
        </>
    )
}

export default Home;