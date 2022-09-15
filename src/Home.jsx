import { Center, Heading, Text, Stack, Input, Button, FormLabel, useToast, Divider } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const toast = useToast()
    const navigate = useNavigate()
    return (
        <>
            <Center h={'100%'} flexDirection='column'>
                <Stack alignItems={'center'} p='4' gap='2'>
                    <Stack marginBottom={'2em'} alignItems='center'>
                        <Heading> Welcome to Windoge 5</Heading>
                        <Heading fontWeight={'600'} fontSize={'xl'}>Your trusty link with your patients</Heading>
                    </Stack>
                    <Divider w={'50%'}></Divider>
                    <Stack direction='column' w={'xs'}>
                        <Text fontWeight={'600'}>Username</Text>
                        <Input variant='filled' placeholder='Enter your username'></Input>
                        <Text fontWeight={'600'}>Password</Text>
                        <Input variant='filled' placeholder='Enter your password'></Input>
                    </Stack>
                    <Stack width='xs'>
                        <Button width='30%'
                            colorScheme={'green'}
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
                </Stack>
            </Center>
        </>
    )
}

export default Home;